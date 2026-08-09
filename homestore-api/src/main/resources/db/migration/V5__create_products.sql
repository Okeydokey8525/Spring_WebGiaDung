CREATE TABLE dbo.products (
    id BIGINT IDENTITY(1,1) NOT NULL,
    category_id BIGINT NOT NULL,
    brand_id BIGINT NULL,
    name NVARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL,
    short_description NVARCHAR(500) NULL,
    description NVARCHAR(MAX) NULL,
    status VARCHAR(20) NOT NULL CONSTRAINT DF_products_status DEFAULT 'DRAFT',
    seo_title NVARCHAR(160) NULL,
    seo_description NVARCHAR(320) NULL,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_products_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_products_updated_at DEFAULT SYSUTCDATETIME(),
    archived_at DATETIME2(3) NULL,

    CONSTRAINT PK_products PRIMARY KEY (id),
    
    CONSTRAINT FK_products_category FOREIGN KEY (category_id)
        REFERENCES dbo.categories(id)
        ON DELETE NO ACTION,

    CONSTRAINT FK_products_brand FOREIGN KEY (brand_id)
        REFERENCES dbo.brands(id)
        ON DELETE NO ACTION,

    CONSTRAINT UX_products_slug UNIQUE (slug),

    CONSTRAINT CK_products_status CHECK (
        status IN ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED')
    ),

    CONSTRAINT CK_products_archive_consistency CHECK (
        (status = 'ARCHIVED' AND archived_at IS NOT NULL) OR
        (status <> 'ARCHIVED' AND archived_at IS NULL)
    )
);
GO

CREATE INDEX IX_products_category_status
ON dbo.products(category_id, status);
GO

CREATE INDEX IX_products_brand_status
ON dbo.products(brand_id, status);
GO
