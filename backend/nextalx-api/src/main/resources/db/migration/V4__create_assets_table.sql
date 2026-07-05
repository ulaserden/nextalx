CREATE TABLE assets
(
    id BIGSERIAL PRIMARY KEY,

    asset_tag VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    brand VARCHAR(100),

    model VARCHAR(100),

    serial_number VARCHAR(100) UNIQUE,

    purchase_date DATE,

    warranty_end_date DATE,

    purchase_price NUMERIC(12,2),

    supplier VARCHAR(150),

    status VARCHAR(30)
                          NOT NULL
        DEFAULT 'AVAILABLE',

    category_id BIGINT
                          NOT NULL,

    created_at TIMESTAMP
                          NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
                          NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_asset_category
        FOREIGN KEY (category_id)
            REFERENCES categories(id)
);