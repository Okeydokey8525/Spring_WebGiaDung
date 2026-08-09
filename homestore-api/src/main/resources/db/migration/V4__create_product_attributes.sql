CREATE TABLE dbo.attributes (
    id BIGINT IDENTITY(1,1) NOT NULL,
    name NVARCHAR(120) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    description NVARCHAR(1000) NULL,
    sort_order INT NOT NULL CONSTRAINT DF_attributes_sort_order DEFAULT 0,
    is_active BIT NOT NULL CONSTRAINT DF_attributes_is_active DEFAULT 1,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_attributes_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_attributes_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_attributes PRIMARY KEY (id),
    CONSTRAINT UX_attributes_name UNIQUE (name),
    CONSTRAINT UX_attributes_slug UNIQUE (slug),
    CONSTRAINT CK_attributes_sort_order_nonnegative CHECK (sort_order >= 0)
);

CREATE INDEX IX_attributes_active_sort ON dbo.attributes (is_active, sort_order, name);

CREATE TABLE dbo.attribute_values (
    id BIGINT IDENTITY(1,1) NOT NULL,
    attribute_id BIGINT NOT NULL,
    value NVARCHAR(120) NOT NULL,
    slug VARCHAR(160) NOT NULL,
    sort_order INT NOT NULL CONSTRAINT DF_attribute_values_sort_order DEFAULT 0,
    is_active BIT NOT NULL CONSTRAINT DF_attribute_values_is_active DEFAULT 1,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_attribute_values_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_attribute_values_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_attribute_values PRIMARY KEY (id),
    CONSTRAINT FK_attribute_values_attribute FOREIGN KEY (attribute_id) REFERENCES dbo.attributes(id) ON DELETE NO ACTION,
    CONSTRAINT UX_attribute_values_attribute_value UNIQUE (attribute_id, value),
    CONSTRAINT UX_attribute_values_attribute_slug UNIQUE (attribute_id, slug),
    CONSTRAINT CK_attribute_values_sort_order_nonnegative CHECK (sort_order >= 0)
);

CREATE INDEX IX_attribute_values_attribute_active_sort ON dbo.attribute_values (attribute_id, is_active, sort_order, value);
