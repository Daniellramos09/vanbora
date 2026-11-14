# ADR-002 — Estratégia de Autenticação Stateless com JWT e Cookies HttpOnly

* **Status:** Aprovado
* **Data:** 2026-11-13
* **Decisores:** Daniel Ramos (Engenheiro Responsável)

---

## 1. Contexto

O VanBora atende múltiplos perfis de usuários com sessões simultâneas (clientes solicitando viagens pelo navegador desktop ou mobile, motoristas acessando o radar de viagens). É necessário definir onde e como o token de autenticação será transmitido e armazenado no navegador.

---

## 2. Alternativas Avaliadas

### Alternativa A: Token JWT armazenado em `localStorage`
* **Prós:** Fácil de implementar no frontend (`localStorage.setItem('token', ...)`).
* **Contras:** **Vulnerabilidade crítica a ataques XSS (Cross-Site Scripting)**. Qualquer script malicioso ou pacote npm de terceiro infectado pode ler o token via `window.localStorage` e sequestrar a sessão do usuário.

### Alternativa B: Sessão Tradicional com Estado no Servidor (Session Id em Memória/Redis)
* **Prós:** Facilidade de revogação imediata.
* **Contras:** Exige infraestrutura adicional de cache (Redis) caso o backend precise de réplicas ou reinicializações, aumentando o custo na Oracle Cloud.

### Alternativa C: Token JWT transmitido via Cookie `HttpOnly; Secure; SameSite=Strict` (Recomendada)
* **Prós:**
  - Imune ao roubo por XSS: o JavaScript do navegador **não tem permissão** de ler o conteúdo de um cookie com a flag `HttpOnly`.
  - A flag `SameSite=Strict` bloqueia requisições forjadas entre sites (proteção nativa contra CSRF).
  - A flag `Secure` garante transmissão exclusiva por conexões criptografadas (HTTPS).
  - O backend permanece stateless (sem necessidade de banco de sessões em memória).

---

## 3. Decisão

Adotamos a **Alternativa C**: Emissão de JWT assinado com algoritmo HMAC-SHA256 (`HS256`), transmitido automaticamente pelo navegador via cookie com as flags `HttpOnly`, `Secure` e `SameSite=Strict`.

O payload do JWT conterá apenas as claims necessárias:
- `sub`: UUID do usuário.
- `role`: Papel de acesso (`ROLE_CLIENT`, `ROLE_PROVIDER`, `ROLE_ADMIN`).
- `exp`: Expiração curta (60 minutos para o Access Token).

---

## 4. Consequências

- O frontend React não precisa manipular tokens em headers manuais nem no `localStorage`.
- Requisições para a API REST no backend precisam estar configuradas com `credentials: 'include'` (no `fetch`/Axios) e CORS configurado com `allowCredentials = true`.
- Cumpre integralmente os requisitos de proteção e privacidade exigidos pela LGPD e OWASP Top 10.
