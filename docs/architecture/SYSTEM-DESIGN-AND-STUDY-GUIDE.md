# VanBora — Guia Prático de System Design & Design System

Este documento registra as diretrizes arquiteturais e conceituais do **VanBora**, servindo como guia de referência rápida para o desenvolvimento prático do projeto e para os seus estudos aplicados de Engenharia de Software.

---

## 1. Glossário Rápido: Frontend vs. Backend

| Conceito | Frontend | Backend |
| :--- | :--- | :--- |
| **Termo** | **Design System** | **System Design** |
| **Foco principal** | Interface, experiência do usuário (UX/UI) e consistência visual | Arquitetura de software, fluxo de dados, regras de negócio e estabilidade |
| **Elementos chave** | Tokens (cores, fontes, espaçamentos), botões, inputs, cards, modais | Endpoints REST, casos de uso, transações, concorrência, tabelas e segurança |
| **Stack no VanBora** | React, TypeScript, Tailwind CSS, Vite | Java 21, Spring Boot, Spring Security, PostgreSQL, Oracle Cloud (OCI) |

---

## 2. Design System no Frontend (Como aplicar rápido)

Pense no Design System como uma **caixa de LEGO padronizada** para não reescrever estilos do zero em cada tela:

```text
frontend/src/
├── design-system/
│   ├── tokens/                  # Cores (#16233B, #2764E8, #F5A623), fontes e sombras
│   ├── primitives/              # Botões, inputs, cards e badges reutilizáveis
│   └── domain/                  # Componentes do negócio: BoardingPassCard, VanCard, AuditStamp
```

### Benefícios Práticos:
1. **Velocidade de desenvolvimento**: Montar novas telas combinando componentes prontos em minutos.
2. **Manutenção centralizada**: Alterar uma cor ou espaçamento reflete automaticamente em todas as telas.
3. **Profissionalismo**: Elimina a aparência genérica ou desorganizada de telas geradas sem padrão.

---

## 3. System Design no Backend (Como estruturar de forma enxuta)

O System Design no backend responde: **Como organizar o servidor para ser seguro, rápido e simples de evoluir sem complexidade desnecessária?**

```
                       [ Frontend React / Vite ]
                                  │
                                  ▼
                ┌───────────────────────────────────┐
                │        HTTPS / CORS Seguro        │
                └───────────────────────────────────┘
                                  │
                                  ▼
 ┌─────────────────────────────────────────────────────────────────────────┐
 │               BACKEND SPRING BOOT (Monólito Modular)                    │
 │                                                                         │
 │  [ Security Filter Chain: JWT em Cookie HttpOnly + @PreAuthorize ]      │
 │                                                                         │
 │  ┌───────────────────┬───────────────────┬───────────────────────────┐  │
 │  │  Módulo IDENTITY  │   Módulo FLEET    │   Módulo REQUESTS/BOOKING │  │
 │  │  (Auth, Perfis)   │   (Vans, Vistoria)│   (Rotas, Preços, Lock)   │  │
 │  └───────────────────┴───────────────────┴───────────────────────────┘  │
 └─────────────────────────────────────────────────────────────────────────┘
                    │                                      │
     ┌──────────────┴──────────────┐         ┌─────────────┴─────────────┐
     ▼                             ▼         ▼                           ▼
┌──────────────┐           ┌──────────────┐ ┌──────────────┐   ┌────────────────┐
│  PostgreSQL  │           │ Oracle Cloud │ │  Provedor de │   │ Notificações   │
│  (Dados e    │           │ Object Store │ │  Rotas/Mapas │   │ (WhatsApp/Msg) │
│  Transações) │           │ (CNH e CRLV) │ │  (Distância) │   │                │
└──────────────┘           └──────────────┘ └──────────────┘   └────────────────┘
```

### Os 4 Pilares Práticos para o VanBora:

1. **Package by Domain**:
   - Organizar pastas por assunto do negócio (`identity`, `fleet`, `requests`, `bookings`) e não por tipo técnico (`controller`, `service`).
   - Facilita encontrar e modificar funcionalidades sem quebrar outros módulos.

2. **Prevenção de Concorrência (Lock de Reserva)**:
   - Dois motoristas nunca podem fechar a mesma corrida simultaneamente.
   - O primeiro que aceita trava a solicitação via transação no PostgreSQL e coloca o status como `CONTRACTED`.

3. **Arquivos fora do Banco (LGPD e Performance)**:
   - Fotos e PDFs de CNH/CRLV ficam no **Object Storage** da Oracle Cloud.
   - O PostgreSQL armazena apenas metadados e status.
   - Acesso a documentos feito apenas via links temporários assinados (que expiram em minutos).

4. **Desacoplamento de APIs Externas**:
   - Criar uma interface própria (`RouteDistanceCalculator`) para cálculo de quilometragem e tempo.
   - Se amanhã trocar Google Maps por Mapbox ou OpenStreetMap, a lógica do VanBora permanece intacta.

---

## 4. Roteiro Direto para Estudo das Suas Dificuldades

Quando for praticar cada tema, foque neste checklist direto:

* [ ] **Spring Security 6**: Entender a cadeia de filtros (`SecurityFilterChain`) e proteger rotas por papel (`hasRole('CLIENT')` vs `hasRole('PROVIDER')`).
* [ ] **JWT**: Saber ler o token no cabeçalho/cookie, validar assinatura secreta e nunca expor dados sensíveis no payload.
* [ ] **Testes Unitários (JUnit 5 + Mockito)**: Praticar a estrutura *Arrange, Act, Assert* testando regras de negócio puras sem depender de banco de dados.
* [ ] **LGPD na Prática**: Coletar apenas dados estritamente necessários para a corrida e proteger documentos pessoais.
* [ ] **Design System**: Criar componentes com variações claras de estado (loading, hover, disabled) garantindo acessibilidade e reuso.
