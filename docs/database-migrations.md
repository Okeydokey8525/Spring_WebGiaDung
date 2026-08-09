# Database Migrations

## 1. Tool
Flyway is the sole mechanism used for database schema migrations.

## 2. Database
SQL Server is the target database engine.

## 3. Runtime User
- Account: `homestore_app`
- Use: Executing DML (SELECT, INSERT, UPDATE, DELETE) during application runtime.
- Restriction: MUST NOT possess `db_ddladmin` or `db_owner` roles.

## 4. Migration User
- Account: `homestore_migrator`
- Use: Executing DDL (CREATE, ALTER, DROP) and schema migrations via Flyway.
- Restriction: MUST NOT possess `db_owner` or `sysadmin` roles.

## 5. Separation of Credentials
Runtime and migration credentials are strictly separated. 
Spring Boot runs as `homestore_app` but configures Flyway to run as `homestore_migrator`.

## 6. Migration Location
`classpath:db/migration`

## 7. Naming Convention
Migrations must follow the pattern: `V<version>__<description>.sql`
Example: `V2__create_categories.sql`
Use snake_case for descriptions.

## 8. Applied Migration Immutability
Never modify applied migration scripts. Version migrations are immutable after they are applied. If an error is made, write a new migration to correct it.

## 9. Clean Restriction
Flyway clean is disabled in the Spring Boot application configuration (`clean-disabled: true`) and must never be executed against shared, staging, or production databases.

## 10. Hibernate DDL
`spring.jpa.hibernate.ddl-auto` must remain `none`. Hibernate is strictly forbidden from modifying the schema.

## 11. Single Schema Migration Mechanism
Flyway is the single schema migration mechanism. Do not use `schema.sql`, `data.sql`, or Hibernate's schema generator alongside Flyway.

## 12. Local Development
For local development, Spring Boot executes Flyway automatically during startup using the dedicated migration credentials provided via environment variables.

## 13. Production Deployment Strategy
In production, it is preferred to use deployment-controlled migrations / CI-CD pipelines executing Flyway directly with migration credentials, rather than giving the runtime application permanent schema privileges.
