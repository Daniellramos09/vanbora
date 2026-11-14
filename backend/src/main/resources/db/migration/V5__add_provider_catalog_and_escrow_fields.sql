-- V5__add_provider_catalog_and_escrow_fields.sql
-- Enriquecimento do perfil de motoristas para catálogo regional e suporte a custódia/escrow

ALTER TABLE provider_profiles
    ADD COLUMN IF NOT EXISTS bio TEXT,
    ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) DEFAULT 5.00,
    ADD COLUMN IF NOT EXISTS completed_trips INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS operating_zones TEXT DEFAULT 'Grande São Paulo',
    ADD COLUMN IF NOT EXISTS amenities TEXT DEFAULT 'Ar-condicionado, Cinto em todos os assentos';

-- Tabela de reservas (bookings) - adicionar campos de custódia / liberação segura
ALTER TABLE bookings
    ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(50) DEFAULT 'HELD', -- HELD, RELEASED, REFUNDED
    ADD COLUMN IF NOT EXISTS check_in_code VARCHAR(10),
    ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMP WITHOUT TIME ZONE,
    ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITHOUT TIME ZONE;

-- Índice para busca rápida de motoristas por região de atuação
CREATE INDEX IF NOT EXISTS idx_provider_profiles_status_region 
    ON provider_profiles(status, base_region);
