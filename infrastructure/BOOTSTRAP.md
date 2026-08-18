# HomeStore development database bootstrap

Normal `docker compose up` starts SQL Server only. It does not run privileged
database bootstrap automatically.

For a new development SQL Server instance:

1. Copy `.env.example` to the ignored `.env` file and replace every placeholder.
2. Start only the `sqlserver` Compose service.
3. Review Flyway migrations V1-V6 before their first execution against the new database.
4. Run the bootstrap explicitly from the `infrastructure` directory:

```powershell
.\bootstrap.ps1
```

The wrapper waits up to 120 seconds for an actual SQL readiness query. It then
ensures `HomeStoreDb`, the two server logins, their database users, and the exact
least-privilege database role memberships exist.

Secrets are read privately from `.env`. They are passed to `sqlcmd` through
temporary process/container environment variables, are not supplied using a
visible password argument, and are restored or cleared when the wrapper exits.
Application and migration passwords must be at least 16 characters, contain
uppercase, lowercase, and digits, and use only this `.env`-safe character set:

```text
A-Z a-z 0-9 ! # % * + , - . : = ? @ ^ _
```

Existing login passwords are deliberately not overwritten on rerun. If credentials
need synchronization, use a separately reviewed credential-rotation procedure.
The bootstrap fails on unexpected login/user mappings or forbidden elevated roles.

After bootstrap succeeds, Flyway may apply immutable V1-V6 in order using
`homestore_migrator`. Application runtime continues to use `homestore_app`.
