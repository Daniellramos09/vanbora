-- V4: Alinhar tipo de coluna audit_logs.details para TEXT compatível com JPA String
ALTER TABLE audit_logs ALTER COLUMN details TYPE TEXT USING details::text;
