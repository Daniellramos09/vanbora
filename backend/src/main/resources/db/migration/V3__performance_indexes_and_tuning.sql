-- ========================================================
-- VanBora Schema Migration V3 - Performance, Otimização de Índices e B-Tree
-- ========================================================

-- 1. Radar do Motorista (Consulta mais frequente da plataforma)
-- Busca solicitações abertas ordenadas pela data de partida mais próxima
CREATE INDEX IF NOT EXISTS idx_requests_radar_perf 
    ON service_requests(status, departure_at ASC) 
    WHERE status = 'OPEN';

-- 2. Filtro de Solicitações por Categoria e Região/Data
CREATE INDEX IF NOT EXISTS idx_requests_category_date 
    ON service_requests(category, departure_at DESC);

-- 3. Propostas: Busca rápida de propostas ativas por solicitação
-- Essencial para o cliente comparar propostas em milissegundos
CREATE INDEX IF NOT EXISTS idx_proposals_request_amount 
    ON proposals(request_id, amount ASC);

-- 4. Propostas enviadas pelo prestador (Histórico e Dashboard do motorista)
CREATE INDEX IF NOT EXISTS idx_proposals_provider_created 
    ON proposals(provider_id, created_at DESC);

-- 5. Contratações Ativas (Dashboard do Cliente e do Prestador)
CREATE INDEX IF NOT EXISTS idx_bookings_customer_status 
    ON bookings(customer_id, status, accepted_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_provider_status 
    ON bookings(provider_id, status, accepted_at DESC);

-- 6. Frota: Busca de veículos ativos por placa (Normalizada para uppercase sem traço)
CREATE UNIQUE INDEX IF NOT EXISTS uq_vehicles_clean_plate 
    ON vehicles(UPPER(REPLACE(plate, '-', '')));

-- 7. Documentação Veicular: Checagem de conformidade de validade (Expiração)
-- Otimiza a rotina do sistema que verifica se a van ou CNH estão vencidas
CREATE INDEX IF NOT EXISTS idx_vehicle_docs_expiration 
    ON vehicle_documents(expiration_date, status);

-- 8. Avaliações (Rating médio do motorista sem fazer full table scan)
CREATE INDEX IF NOT EXISTS idx_reviews_provider_rating 
    ON reviews(provider_id, rating);
