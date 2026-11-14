# Registro de Decisões de Arquitetura & Governança Financeira — VanBora

> **Data:** 13/11/2026  
> **Status:** Aprovado em Sessão de Alinhamento Estratégico & Engenharia de Software  
> **Tema Central:** Modelo de Custódia (Escrow), Segurança Anti-Fraude, Catálogo Regional e Integridade Financeira

---

## 1. O Problema Central de Negócio: O Risco de Golpe no Transporte de Vans

No mercado tradicional de fretamento de vans para fins de semana (sítios, buffets, praias, traslados):
- **O risco do cliente:** Transferir de 30% a 50% de sinal via Pix para um motorista desconhecido no WhatsApp e a van nunca aparecer no sábado pela manhã.
- **O risco do motorista:** Rodar 150 km, gastar centenas de reais em óleo diesel e pedágio do próprio bolso, e no final o organizador do grupo dar calote dizendo que *"o pessoal ainda não transferiu no Pix"*.

---

## 2. Decisão Arquitetural: O Modelo de Custódia Garantida (Escrow)

Para blindar tanto o passageiro quanto o motorista parceiro, o VanBora adota o modelo de **Custódia Retida com Liberação por Check-in Físico**:

```
                       FLUXO DE CUSTÓDIA & EMBARQUE
                       
[Passageiro Contrata] ──► Paga R$ 1.000 (Cartão/Pix via Gateway)
                                   │
                                   ▼
                 [VanBora retém o saldo em Custódia]
                 - Status: HELD (Retido)
                 - Motorista recebe garantia: "Viagem Paga"
                 - Gerado Código de Check-in: VB-XXXX
                                   │
[Dia do Passeio]      ──► Van chega no ponto de embarque
                                   │
                                   ▼
                 [Check-in Presencial de 4 Dígitos]
                 - Passageiro fornece o código ao motorista
                 - Motorista digita no app VanBora
                 - Status muda: IN_PROGRESS (Passageiros a bordo)
                                   │
[Término da Rota]     ──► Van chega ao destino com segurança
                                   │
                                   ▼
                 [Liberação Automática da Custódia]
                 - Status: RELEASED (Liberado)
                 - Saldo transferido diretamente para a conta do motorista
```

### Por que não guardar o dinheiro na conta bancária própria da empresa?
1. **Regulação do Banco Central (BACEN):** Empresas sem licença de Instituição de Pagamento (IP) não podem manter dinheiro de terceiros em conta própria.
2. **Aspecto Tributário (Receita Federal):** Se entrar R$ 1.000 na conta PJ do site, a Receita tributará os R$ 1.000 como faturamento bruto, quando na verdade o faturamento da plataforma é apenas a taxa de serviço (ex: R$ 100).
3. **Decisão:** O VanBora utilizará APIs de **Split de Pagamento com Subcontas** (como *Asaas* ou *Mercado Pago*), onde o gateway retém os valores e faz a divisão/desbloqueio automático via webhook.

---

## 3. Decisão de Produto: Catálogo Aberto vs. Contato Direto

### A Armadilha da Desintermediação (Leakage)
- Se o telefone/WhatsApp do motorista ficar visível publicamente no site antes do pagamento:
  - O cliente chamará o motorista por fora para negociar desconto no Pix.
  - A plataforma arca com os custos de infraestrutura e perde a receita.
  - Se houver golpe ou acidente, o cliente culpará publicamente a marca VanBora.

### A Solução Híbrida Aprovada:
1. **Catálogo Regional Aberto (`ProvidersCatalogPage.tsx`):**
   - O passageiro visualiza os motoristas cadastrados por região/bairro de atuação (ex: *Zona Leste, Santana, ABC*), avaliações (estrelas), capacidade de passageiros da van (15 a 19 lugares) e diferenciais de conforto (ar-condicionado, tomadas USB, bagageiro extra).
2. **Contato Seguro & Just-in-Time:**
   - Antes do pagamento: Dúvidas são tiradas dentro da plataforma.
   - Após a reserva confirmada e valor em garantia: **Telefone direto e WhatsApp são liberados** para o alinhamento de horários do dia do embarque.

---

## 4. Pilares de Integridade Financeira & Código à Prova de Erros

| Pilar | Decisão Técnica Implementada |
| :--- | :--- |
| **Precisão Numérica** | **Proibido o uso de `float` ou `double`.** Todas as moedas e percentuais usam `NUMERIC(10, 2)` no PostgreSQL e `java.math.BigDecimal` com `RoundingMode.HALF_UP` no Spring Boot. |
| **Prevenção de Duplo Pagamento (Race Condition)** | Transações críticas de liberação de custódia com `@Transactional` e controle de concorrência idempotente. |
| **Máquina de Estados Finita** | A corrida só pode avançar linearmente: `CONFIRMED (HELD)` ➔ `IN_PROGRESS` ➔ `COMPLETED (RELEASED)`. É impossível liberar dinheiro sem o check-in prévio. |
| **Auditoria Imutável** | Toda transação e alteração de custódia gera um registro indelével na tabela `audit_logs` com IP de origem, timestamp ISO-8601 e ID do operador. |

---

## 5. Resumo do que foi Desenvolvido e Entregue

1. **Migration V5 no Banco de Dados (`V5__add_provider_catalog_and_escrow_fields.sql`):**
   - Campos `operating_zones`, `bio`, `rating`, `amenities` em `provider_profiles`.
   - Campos `escrow_status`, `check_in_code`, `checked_in_at` em `bookings`.
2. **Backend API (`ProviderCatalogController.java` & `BookingController.java`):**
   - `GET /api/v1/providers/catalog` (Consulta regional de motoristas verificados).
   - `POST /api/v1/bookings/{id}/check-in` (Validação de embarque por código).
   - `POST /api/v1/bookings/{id}/complete` (Liberação atômica de custódia).
3. **Frontend React:**
   - `AddressAutocomplete.tsx` + `geoService.ts` com cálculo de rota real em km via OpenStreetMap.
   - `ProvidersCatalogPage.tsx`: Catálogo com filtros de bairro e modal de segurança anti-fraude.
   - `ClientBookingsPage.tsx`: Bilhete digital com código de check-in e indicador de garantia.
   - `ProviderDashboard.tsx`: Painel do motorista com simulador de check-in e liberação de pagamento.
