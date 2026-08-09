CREATE TABLE dbo.brands (
    id BIGINT IDENTITY(1,1) NOT NULL,
    name NVARCHAR(120) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    description NVARCHAR(1000) NULL,
    logo_url NVARCHAR(500) NULL,
    website_url NVARCHAR(500) NULL,
    sort_order INT NOT NULL CONSTRAINT DF_brands_sort_order DEFAULT 0,
    is_active BIT NOT NULL CONSTRAINT DF_brands_is_active DEFAULT 1,
    seo_title NVARCHAR(160) NULL,
    seo_description NVARCHAR(320) NULL,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_brands_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_brands_updated_at DEFAULT SYSUTCDATETIME(),
    
    CONSTRAINT PK_brands PRIMARY KEY (id),
    CONSTRAINT CK_brands_sort_order_nonnegative CHECK (sort_order >= 0)
);

CREATE UNIQUE INDEX UX_brands_name ON dbo.brands (name);
CREATE UNIQUE INDEX UX_brands_slug ON dbo.brands (slug);
CREATE INDEX IX_brands_active_sort ON dbo.brands (is_active, sort_order, name);
