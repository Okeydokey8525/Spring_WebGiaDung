CREATE TABLE dbo.user_accounts (
    id BIGINT IDENTITY(1,1) NOT NULL,
    full_name NVARCHAR(120) NOT NULL,
    email NVARCHAR(320) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CONSTRAINT DF_user_accounts_role DEFAULT 'CUSTOMER',
    is_active BIT NOT NULL CONSTRAINT DF_user_accounts_is_active DEFAULT 1,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_user_accounts_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_user_accounts_updated_at DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_user_accounts PRIMARY KEY (id),
    CONSTRAINT CK_user_accounts_role CHECK (role IN ('CUSTOMER', 'ADMIN'))
);

CREATE UNIQUE INDEX UX_user_accounts_email
    ON dbo.user_accounts (email);

CREATE INDEX IX_user_accounts_role_active
    ON dbo.user_accounts (role, is_active, id);
