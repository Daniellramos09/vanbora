-- V2: Compliance LGPD, Auditoria e Regras de Cancelamento

-- 1. Tabela de Consentimento Explícito (LGPD Art. 7º e 8º)
CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    term_version VARCHAR(20) NOT NULL, -- ex: 'v1.0-2026'
    consent_type VARCHAR(50) NOT NULL, -- 'TERMS_OF_SERVICE', 'PRIVACY_POLICY', 'COMMUNICATIONS'
    granted BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_user_consents_user_id ON user_consents(user_id);

-- 2. Tabela de Logs de Auditoria do Sistema (Rastreabilidade e Compliance)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,                     -- quem realizou a ação (null se anônimo/sistema)
    actor_email VARCHAR(150),
    actor_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,       -- ex: 'DOCUMENT_APPROVED', 'BOOKING_CANCELLED'
    entity_name VARCHAR(100) NOT NULL,  -- ex: 'VehicleDocument', 'Booking'
    entity_id UUID NOT NULL,            -- id do registro afetado
    details JSONB,                      -- detalhes da mudança (antes/depois)
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_name, entity_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 3. Adicionar campos de auditoria e cancelamento em Bookings
ALTER TABLE bookings 
    ADD COLUMN cancellation_reason TEXT,
    ADD COLUMN cancelled_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN cancelled_by UUID,
    ADD COLUMN refund_percentage NUMERIC(5,2) DEFAULT 0.00;
