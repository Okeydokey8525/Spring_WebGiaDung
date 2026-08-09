CREATE TABLE dbo.categories (
    id BIGINT IDENTITY(1,1) NOT NULL,
    parent_id BIGINT NULL,
    name NVARCHAR(120) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    description NVARCHAR(1000) NULL,
    image_url NVARCHAR(500) NULL,
    sort_order INT NOT NULL CONSTRAINT DF_categories_sort_order DEFAULT 0,
    is_active BIT NOT NULL CONSTRAINT DF_categories_is_active DEFAULT 1,
    seo_title NVARCHAR(160) NULL,
    seo_description NVARCHAR(320) NULL,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_categories_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_categories_updated_at DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_categories PRIMARY KEY (id),
    CONSTRAINT FK_categories_parent FOREIGN KEY (parent_id) REFERENCES dbo.categories(id) ON DELETE NO ACTION,
    CONSTRAINT CK_categories_not_self_parent CHECK (parent_id IS NULL OR parent_id <> id),
    CONSTRAINT CK_categories_sort_order_nonnegative CHECK (sort_order >= 0)
);
GO

CREATE UNIQUE INDEX UX_categories_slug ON dbo.categories(slug);
GO

CREATE INDEX IX_categories_parent_active_sort ON dbo.categories(parent_id, is_active, sort_order, name);
GO
