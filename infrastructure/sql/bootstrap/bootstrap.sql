:On Error exit

SET NOCOUNT ON;
SET XACT_ABORT ON;

USE [master];

IF DB_ID(N'HomeStoreDb') IS NULL
BEGIN
    EXEC (N'CREATE DATABASE [HomeStoreDb]');
END;

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = N'homestore_app')
BEGIN
    CREATE LOGIN [homestore_app]
        WITH PASSWORD = N'$(HOMESTORE_APP_PASSWORD)',
             CHECK_POLICY = ON,
             CHECK_EXPIRATION = OFF;
END;

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = N'homestore_migrator')
BEGIN
    CREATE LOGIN [homestore_migrator]
        WITH PASSWORD = N'$(HOMESTORE_MIGRATOR_PASSWORD)',
             CHECK_POLICY = ON,
             CHECK_EXPIRATION = OFF;
END;

IF EXISTS (
    SELECT 1
    FROM sys.server_role_members AS membership
    INNER JOIN sys.server_principals AS member_principal
        ON member_principal.principal_id = membership.member_principal_id
    WHERE member_principal.name IN (N'homestore_app', N'homestore_migrator')
)
BEGIN
    THROW 51000, 'Application and migration logins must not belong to fixed server roles.', 1;
END;

USE [HomeStoreDb];

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'homestore_app')
BEGIN
    CREATE USER [homestore_app] FOR LOGIN [homestore_app];
END;
ELSE IF SUSER_SID(N'homestore_app') <> USER_SID(N'homestore_app')
BEGIN
    THROW 51001, 'Existing homestore_app database user is not mapped to the expected login.', 1;
END;

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'homestore_migrator')
BEGIN
    CREATE USER [homestore_migrator] FOR LOGIN [homestore_migrator];
END;
ELSE IF SUSER_SID(N'homestore_migrator') <> USER_SID(N'homestore_migrator')
BEGIN
    THROW 51002, 'Existing homestore_migrator database user is not mapped to the expected login.', 1;
END;

IF IS_ROLEMEMBER(N'db_owner', N'homestore_app') = 1
    OR IS_ROLEMEMBER(N'db_ddladmin', N'homestore_app') = 1
BEGIN
    THROW 51003, 'homestore_app has a forbidden database role.', 1;
END;

IF IS_ROLEMEMBER(N'db_owner', N'homestore_migrator') = 1
BEGIN
    THROW 51004, 'homestore_migrator has a forbidden database role.', 1;
END;

IF IS_ROLEMEMBER(N'db_datareader', N'homestore_app') <> 1
BEGIN
    ALTER ROLE [db_datareader] ADD MEMBER [homestore_app];
END;

IF IS_ROLEMEMBER(N'db_datawriter', N'homestore_app') <> 1
BEGIN
    ALTER ROLE [db_datawriter] ADD MEMBER [homestore_app];
END;

IF IS_ROLEMEMBER(N'db_datareader', N'homestore_migrator') <> 1
BEGIN
    ALTER ROLE [db_datareader] ADD MEMBER [homestore_migrator];
END;

IF IS_ROLEMEMBER(N'db_datawriter', N'homestore_migrator') <> 1
BEGIN
    ALTER ROLE [db_datawriter] ADD MEMBER [homestore_migrator];
END;

IF IS_ROLEMEMBER(N'db_ddladmin', N'homestore_migrator') <> 1
BEGIN
    ALTER ROLE [db_ddladmin] ADD MEMBER [homestore_migrator];
END;
