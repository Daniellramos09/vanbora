# ADR-001 — Adoção de Monólito Modular com Package by Domain

* **Status:** Aprovado
* **Data:** 2026-11-13
* **Decisores:** Daniel Ramos (Engenheiro Responsável)

---

## 1. Contexto

O **VanBora** é um marketplace em fase de consolidação de produto e validação de modelo de negócio para transporte por vans na Grande São Paulo. O sistema precisa suportar quatro perfis de usuários (Visitante, Cliente, Prestador e Administrador), regras de cálculo de rotas, auditoria documental e fechamento de contratos de viagem.

A escolha da arquitetura inicial precisa equilibrar:
* Rapidez de desenvolvimento e baixo custo de infraestrutura.
* Separação clara de responsabilidades para evitar acoplamento desordenado.
* Facilidade para testar regras críticas de negócio (concorrência, elegibilidade e preços).
* Capacidade de evolução sem necessidade de reescrita prematura.

---

## 2. Alternativas Avaliadas

### Alternativa A: Microsserviços Distribuídos
* **Prós:** Escalabilidade independente por serviço; tecnologias heterogêneas.
* **Contras:** Complexidade excessiva para o estágio atual (deploy distribuído, mensageria assíncrona, consistência eventual, orquestração de containers, monitoramento distribuído). Alto custo de manutenção e risco de atrasar a entrega do produto.

### Alternativa B: Monólito Tradicional em Camadas Técnicas (`controller/`, `service/`, `repository/`)
* **Prós:** Familiaridade inicial.
* **Contras:** Mistura conceitos de domínios diferentes numa mesma pasta conforme o sistema cresce (ex: 20 controllers no mesmo diretório), dificultando a manutenção e a identificação de limites de contexto.

### Alternativa C: Monólito Modular com *Package by Domain* (Recomendada)
* **Prós:**
  - Aplicação executada em um único processo e deploy simplificado (JAR único na nuvem).
  - Organização de código estruturada por contexto de negócio (`identity`, `fleet`, `requests`, `bookings`).
  - Comunicação síncrona direta entre módulos via interfaces limpas dentro da mesma JVM.
  - Facilidade de transição: se algum domínio específico (ex: `requests` ou mapas) demandar escala independente no futuro, a extração para um microsserviço é direta porque suas classes já estão isoladas no mesmo pacote.

---

## 3. Decisão

Adotamos a **Alternativa C: Monólito Modular** estruturado com **Package by Domain** utilizando **Java 21** e **Spring Boot 3**, persistido em **PostgreSQL** com migrações via **Flyway**.

---

## 4. Consequências

### Positivas:
1. **Produtividade Máxima**: Configuração simples de pipeline de CI/CD e container Docker único.
2. **Integridade de Dados**: Transações ACID nativas do PostgreSQL garantem que contratações de viagens e atualizações de propostas sejam atômicas sem necessidade de sagas distribuídas.
3. **Facilidade de Testes**: Testes de integração diretos com Spring Boot Test e Testcontainers rodando localmente em segundos.

### Riscos e Mitigações:
1. **Risco de dependências cruzadas indevidas**:
   - *Mitigação*: Um módulo nunca deve injetar o `Repository` JPA de outro domínio diretamente. A comunicação deve ocorrer exclusivamente através de `Services` de aplicação ou portas/interfaces públicas do pacote.
