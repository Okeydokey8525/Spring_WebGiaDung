CREATE TABLE dbo.product_attributes (
    id BIGINT IDENTITY(1,1) NOT NULL,
    product_id BIGINT NOT NULL,
    attribute_id BIGINT NOT NULL,
    sort_order INT NOT NULL CONSTRAINT DF_product_attributes_sort_order DEFAULT 0,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_product_attributes_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_product_attributes_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_product_attributes PRIMARY KEY (id),
    CONSTRAINT FK_product_attributes_product FOREIGN KEY (product_id) REFERENCES dbo.products(id) ON DELETE NO ACTION,
    CONSTRAINT FK_product_attributes_attribute FOREIGN KEY (attribute_id) REFERENCES dbo.attributes(id) ON DELETE NO ACTION,
    CONSTRAINT UX_product_attributes_product_attribute UNIQUE (product_id, attribute_id),
    CONSTRAINT CK_product_attributes_sort_order_nonnegative CHECK (sort_order >= 0)
);

CREATE INDEX IX_product_attributes_product_sort ON dbo.product_attributes(product_id, sort_order, attribute_id);

CREATE TABLE dbo.product_attribute_values (
    id BIGINT IDENTITY(1,1) NOT NULL,
    product_attribute_id BIGINT NOT NULL,
    attribute_value_id BIGINT NOT NULL,
    sort_order INT NOT NULL CONSTRAINT DF_product_attribute_values_sort_order DEFAULT 0,
    created_at DATETIME2(3) NOT NULL CONSTRAINT DF_product_attribute_values_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2(3) NOT NULL CONSTRAINT DF_product_attribute_values_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT PK_product_attribute_values PRIMARY KEY (id),
    CONSTRAINT FK_product_attribute_values_product_attribute FOREIGN KEY (product_attribute_id) REFERENCES dbo.product_attributes(id) ON DELETE NO ACTION,
    CONSTRAINT FK_product_attribute_values_attribute_value FOREIGN KEY (attribute_value_id) REFERENCES dbo.attribute_values(id) ON DELETE NO ACTION,
    CONSTRAINT UX_product_attribute_values_assignment_value UNIQUE (product_attribute_id, attribute_value_id),
    CONSTRAINT CK_product_attribute_values_sort_order_nonnegative CHECK (sort_order >= 0)
);

CREATE INDEX IX_product_attribute_values_assignment_sort ON dbo.product_attribute_values(product_attribute_id, sort_order, attribute_value_id);
