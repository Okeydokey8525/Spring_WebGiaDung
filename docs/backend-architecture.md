# Backend Architecture

## 1. Architecture Style
**Modular Monolith**
- The system is a single deployable backend.
- Modules are separated by business capability to ensure clear boundaries.
- Microservices are avoided initially to reduce operational complexity.
- We follow a strict **Package-by-Feature** convention.

## 2. Layering Inside a Feature
Future features may conceptually use the following layers:
- `api/` (REST Controllers, DTOs)
- `application/` (Business Use Cases, Application Services)
- `domain/` (Entities, Value Objects, Domain Services)
- `infrastructure/` (Repositories, external integrations)
*Note: Do not force all four layers if a simple feature does not need them. Avoid unnecessary abstraction.*

## 3. Feature Isolation
A feature must not directly manipulate another feature's repository or entity unless explicitly designed. Prefer service or application boundaries.

## 4. DTO Rules
- JPA Entities MUST NOT be returned directly from REST controllers.
- Future APIs must use request/response DTOs.

## 5. API Base Path
- URL convention: `/api/v1/...` (e.g. `/api/v1/products`)
- Versioning strategy: URI path versioning. Custom header versioning is not implemented yet.

## 6. REST Convention
- Use standard HTTP semantics (GET, POST, PUT/PATCH, DELETE).
- Use HTTP status codes properly.
- Do not create a global success response envelope (e.g., `{ "success": true, "data": ... }`) unless future requirements justify it. Successful API responses should normally return the resource/DTO directly.

## 7. Error Convention
- Follow **RFC 9457 Problem Details**.
- Spring types used: `ProblemDetail`, `ErrorResponse`, `ResponseEntityExceptionHandler`.
- Content-type: `application/problem+json`.
- Do not invent incompatible custom error JSON.

## 8. Security Boundary
- Authentication implementation is deferred.
- Future security roles likely include: `CUSTOMER`, `STAFF`, `ADMIN`.
- No JWT implementation at this stage.

## 9. Database Rule
- SQL Server is the primary database.
- Hibernate must NOT auto-create production schema (`ddl-auto: none`).
- Flyway will be introduced for schema migrations later.

## 10. Secrets
- No database/password/token secrets committed.
- Use environment variables for all secrets.

## 11. Logging Convention
- **SLF4J** is the standard logging facade.
- `ERROR` for unexpected server failures.
- `WARN` for recoverable abnormal conditions.
- `INFO` for meaningful lifecycle/business events.
- `DEBUG` for development diagnostics.
- **Never log**: passwords, access tokens, refresh tokens, full payment credentials, or secrets.

## 12. CORS Strategy
- CORS allowed origins will later be externalized by configuration.
- Do NOT enable wildcard CORS (`allowedOrigins = "*"`).
- Actual `CorsConfigurationSource` implementation is deferred until a frontend requires cross-origin access and integrates with Spring Security.

## 13. Root Package
- `vn.homestore.api`

## 14. Environment Strategy
- Intended environments: `local`, `test`, `production`.
- Currently no unnecessary profile files are created.

## 15. Request Correlation
- Incoming header: `X-Request-Id`
- MDC key: `requestId`
- Incoming IDs are validated and limited to 128 characters of safe characters (`^[a-zA-Z0-9\-_.:]+$`).
- If missing, blank, overly long, or unsafe, a new UUID is generated.
