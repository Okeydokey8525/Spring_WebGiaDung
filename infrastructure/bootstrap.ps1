[CmdletBinding()]
param(
    [ValidateRange(1, 300)]
    [int] $ReadinessTimeoutSeconds = 120
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$expectedContainer = 'homestore-sqlserver'
$envPath = Join-Path $PSScriptRoot '.env'
$sqlPath = Join-Path $PSScriptRoot 'sql\bootstrap\bootstrap.sql'

function Read-DotEnv {
    param([Parameter(Mandatory)][string] $Path)

    $values = @{}
    foreach ($line in [System.IO.File]::ReadAllLines($Path, [System.Text.Encoding]::UTF8)) {
        $trimmed = $line.Trim()
        if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith('#')) {
            continue
        }

        $separator = $line.IndexOf('=')
        if ($separator -lt 1) {
            throw 'Invalid .env entry. Expected KEY=VALUE syntax.'
        }

        $key = $line.Substring(0, $separator).Trim()
        $value = $line.Substring($separator + 1).Trim()
        if ($values.ContainsKey($key)) {
            throw "Duplicate .env key: $key"
        }

        if ($value.Length -ge 2) {
            $doubleQuoted = $value[0] -eq '"' -and $value[$value.Length - 1] -eq '"'
            $singleQuoted = $value[0] -eq "'" -and $value[$value.Length - 1] -eq "'"
            if ($doubleQuoted -or $singleQuoted) {
                $value = $value.Substring(1, $value.Length - 2)
            }
        }

        $values[$key] = $value
    }

    return $values
}

function Get-RequiredValue {
    param(
        [Parameter(Mandatory)][hashtable] $Values,
        [Parameter(Mandatory)][string] $Name
    )

    if (-not $Values.ContainsKey($Name) -or [string]::IsNullOrWhiteSpace($Values[$Name])) {
        throw "Required environment value is missing: $Name"
    }

    return [string] $Values[$Name]
}

function Assert-SafeSqlLoginPassword {
    param(
        [Parameter(Mandatory)][string] $Value,
        [Parameter(Mandatory)][string] $Name
    )

    if ($Value.Length -lt 16 -or
        $Value -cnotmatch '[A-Z]' -or
        $Value -cnotmatch '[a-z]' -or
        $Value -notmatch '[0-9]' -or
        $Value -notmatch '^[A-Za-z0-9!#%*+,\-.:=?@^_]+$') {
        throw "$Name must be at least 16 characters, contain uppercase, lowercase, and digits, and use only the documented .env-safe character set."
    }
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw 'Docker CLI is unavailable. Install or start Docker separately; this script does not repair Docker.'
}
if (-not (Test-Path -LiteralPath $envPath -PathType Leaf)) {
    throw 'infrastructure/.env is missing. Create it from .env.example and supply private development secrets.'
}
if (-not (Test-Path -LiteralPath $sqlPath -PathType Leaf)) {
    throw 'Bootstrap SQL source is missing.'
}

$values = Read-DotEnv -Path $envPath
$saPassword = Get-RequiredValue -Values $values -Name 'MSSQL_SA_PASSWORD'
$runtimeUser = Get-RequiredValue -Values $values -Name 'DB_USERNAME'
$runtimePassword = Get-RequiredValue -Values $values -Name 'DB_PASSWORD'
$migratorUser = Get-RequiredValue -Values $values -Name 'MIGRATION_DB_USERNAME'
$migratorPassword = Get-RequiredValue -Values $values -Name 'MIGRATION_DB_PASSWORD'

if ($runtimeUser -cne 'homestore_app') {
    throw 'DB_USERNAME must be homestore_app for this bootstrap.'
}
if ($migratorUser -cne 'homestore_migrator') {
    throw 'MIGRATION_DB_USERNAME must be homestore_migrator for this bootstrap.'
}
Assert-SafeSqlLoginPassword -Value $runtimePassword -Name 'DB_PASSWORD'
Assert-SafeSqlLoginPassword -Value $migratorPassword -Name 'MIGRATION_DB_PASSWORD'

$previousSqlcmdPassword = [Environment]::GetEnvironmentVariable('SQLCMDPASSWORD', 'Process')
$previousRuntimePassword = [Environment]::GetEnvironmentVariable('HOMESTORE_APP_PASSWORD', 'Process')
$previousMigratorPassword = [Environment]::GetEnvironmentVariable('HOMESTORE_MIGRATOR_PASSWORD', 'Process')

try {
    [Environment]::SetEnvironmentVariable('SQLCMDPASSWORD', $saPassword, 'Process')
    [Environment]::SetEnvironmentVariable('HOMESTORE_APP_PASSWORD', $runtimePassword, 'Process')
    [Environment]::SetEnvironmentVariable('HOMESTORE_MIGRATOR_PASSWORD', $migratorPassword, 'Process')

    & docker info --format '{{.ServerVersion}}' *> $null
    if ($LASTEXITCODE -ne 0) {
        throw 'Docker Engine is unavailable. Start it separately; this script does not perform recovery.'
    }

    $containerState = (& docker inspect --format '{{.State.Running}}' $expectedContainer 2>$null).Trim()
    if ($LASTEXITCODE -ne 0 -or $containerState -cne 'true') {
        throw "Expected SQL Server container '$expectedContainer' is not running."
    }

    $deadline = [DateTime]::UtcNow.AddSeconds($ReadinessTimeoutSeconds)
    $ready = $false
    do {
        & docker exec -e SQLCMDPASSWORD $expectedContainer /opt/mssql-tools18/bin/sqlcmd `
            -S localhost -U sa -C -b -Q 'SET NOCOUNT ON; SELECT 1;' *> $null
        if ($LASTEXITCODE -eq 0) {
            $ready = $true
            break
        }
        Start-Sleep -Seconds 2
    } while ([DateTime]::UtcNow -lt $deadline)

    if (-not $ready) {
        throw "SQL Server did not become ready within $ReadinessTimeoutSeconds seconds."
    }

    $bootstrapSql = [System.IO.File]::ReadAllText($sqlPath, [System.Text.Encoding]::UTF8)
    $bootstrapSql | & docker exec -i `
        -e SQLCMDPASSWORD `
        -e HOMESTORE_APP_PASSWORD `
        -e HOMESTORE_MIGRATOR_PASSWORD `
        $expectedContainer `
        /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -C -b -r 1 *> $null

    if ($LASTEXITCODE -ne 0) {
        throw 'SQL Server development bootstrap failed.'
    }

    Write-Host 'HomeStore SQL Server development bootstrap completed.'
    Write-Host 'Next step: review V1-V6, then run Flyway through the backend startup workflow.'
}
finally {
    [Environment]::SetEnvironmentVariable('SQLCMDPASSWORD', $previousSqlcmdPassword, 'Process')
    [Environment]::SetEnvironmentVariable('HOMESTORE_APP_PASSWORD', $previousRuntimePassword, 'Process')
    [Environment]::SetEnvironmentVariable('HOMESTORE_MIGRATOR_PASSWORD', $previousMigratorPassword, 'Process')
}
