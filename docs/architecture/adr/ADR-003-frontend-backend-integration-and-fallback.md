# ADR-003: Integração Frontend-Backend e Política de Mock/Fallback

## Status
Aceito

## Contexto
O frontend do VanBora foi projetado inicialmente para funcionar como um protótipo dinâmico interativo (Single Page Application com React e Vite), persistindo dados na memória e em mock context (`AppContext`). O backend em Java 21 / Spring Boot 3 foi implementado seguindo o padrão *Package by Domain*, expondo APIs RESTful documentadas via Swagger/OpenAPI.

Para garantir que o frontend permaneça 100% funcional em ambientes de demonstração estáticos (como Vercel) enquanto o backend é executado localmente ou hospedado na nuvem (Oracle Cloud Infrastructure - OCI), é necessária uma camada de serviço de cliente HTTP flexível.

## Alternativas Consideradas
1. **Frontend dependente estritamente do backend online:**
   - *Prós:* Menos código no frontend.
   - *Contras:* Caso o backend esteja desligado ou em manutenção na OCI, a interface web fica quebrada para visitantes e recrutadores.
2. **Camada de Serviço Híbrida (API Client com Fallback Gracioso):**
   - *Prós:* As chamadas tentam a API real (`/api/v1/...`). Se a API responder, os dados reais são utilizados; se a API estiver inacessível (Network Error / modo demo estático), a aplicação utiliza o mock inteligente de forma transparente, exibindo um indicador visual discreto de conectividade.
   - *Contras:* Requer gerenciamento centralizado do cliente HTTP.

## Decisão
Adotar uma **Camada de Serviço Centralizada com Adaptador de Fallback** (`frontend/src/services/apiClient.ts`).
- A URL base da API é configurada via variável de ambiente `VITE_API_URL` (padrão `http://localhost:8080` ou URL de produção na OCI).
- Quando o backend responde, os dados persistem no banco PostgreSQL real.
- Em caso de falha de conexão ou na ausência de backend ativo, o frontend mantém o fluxo operacional sem lançar erros críticos ao usuário.

## Consequências
- A aplicação pode ser apresentada em qualquer ambiente sem risco de falha por indisponibilidade momentânea do servidor backend.
- Facilidade na escrita de testes de integração e desacoplamento do contrato REST.
