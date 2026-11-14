# VanBora — Requisitos e Regras de Negócio

Este documento formaliza as fronteiras do produto, definindo claramente o que o sistema faz (**RF**), como ele deve operar (**RNF**) e quais condições determinam o comportamento do negócio (**RN**).

---

## 1. Requisitos Funcionais (RF) por Módulo

### 1.1 Autenticação e Conta
* **RF-001**: O sistema deve permitir o cadastro de novos usuários com nome, e-mail, telefone/WhatsApp e senha criptografada.
* **RF-002**: O sistema deve permitir login seguro com geração de token JWT.
* **RF-003**: O sistema deve oferecer fluxo de recuperação de senha por e-mail ou código via WhatsApp.
* **RF-004**: O usuário pode atualizar dados cadastrais que não exijam nova homologação documental.

### 1.2 Clientes (Passageiros e Empresas)
* **RF-005**: O cliente pode se cadastrar como Pessoa Física (Família / Amigos) ou Pessoa Jurídica (Empresa / Instituição / Escola).
* **RF-006**: O cliente pode visualizar seu histórico de solicitações, propostas recebidas e viagens contratadas.

### 1.3 Prestadores (Motoristas Autônomos e Frotistas)
* **RF-007**: O motorista deve informar seu nome de identificação/chamada, WhatsApp, regiões de base de atendimento e CNH categoria D.
* **RF-008**: O prestador pode cadastrar múltiplos veículos (vans) com placa, modelo e capacidade de assentos.
* **RF-009**: O prestador pode consultar o radar de solicitações abertas e filtrá-las por região e modalidade.
* **RF-010**: O prestador pode aceitar uma corrida pelo valor justo calculado ou enviar condições específicas.

### 1.4 Gestão de Frota e Documentação
* **RF-011**: O sistema deve permitir o upload de documentos do veículo (CRLV e laudo de vistoria).
* **RF-012**: O sistema deve armazenar os arquivos de documentos em Object Storage privado, guardando no banco de dados apenas metadados e data de validade.

### 1.5 Solicitações de Viagem
* **RF-013**: O cliente pode criar uma solicitação especificando título, modalidade, origem, destino final, data e horário de saída.
* **RF-014**: O sistema deve permitir a inclusão de múltiplos pontos de embarque intermediários (`TripStop`) com número de passageiros por parada.
* **RF-015**: O cliente pode especificar a necessidade de ida e volta garantidas com data e horário de retorno.
* **RF-016**: O sistema deve calcular automaticamente a estimativa de preço justo com base na rota, tempo de disponibilidade e paradas.

### 1.6 Propostas e Contratação
* **RF-017**: O cliente pode comparar as propostas recebidas e aceitar uma delas.
* **RF-018**: Ao aceitar uma proposta, o sistema deve gerar uma reserva (`Booking`) confirmada com os dados do motorista, veículo e termos aceitos.
* **RF-019**: As demais propostas concorrentes da mesma solicitação devem ser invalidadas automaticamente.

### 1.7 Avaliações e Histórico
* **RF-020**: O cliente e o motorista podem registrar uma avaliação com nota (1 a 5) e comentário após o término da viagem.

### 1.8 Administração e Auditoria
* **RF-021**: O administrador deve ter acesso a uma fila de auditoria para analisar e aprovar ou reprovar documentos de prestadores com justificativa formal.
* **RF-022**: O sistema deve registrar logs de auditoria para operações sensíveis (aprovações, alterações de papéis e cancelamentos).

---

## 2. Requisitos Não Funcionais (RNF)

| Categoria | Requisito | Meta Técnica |
| :--- | :--- | :--- |
| **Segurança** | Autenticação e autorização por perfil | Spring Security 6 com JWT em cookie `HttpOnly; Secure; SameSite=Strict` e anotações `@PreAuthorize` |
| **Privacidade** | Conformidade com LGPD | Minimização de dados: placas mascaradas publicamente; documentos em bucket privado acessíveis apenas via URLs pré-assinadas |
| **Integridade** | Atomicidade e prevenção de concorrência | Transações com lock (`@Version` ou `PESSIMISTIC_WRITE`) para impedir que dois motoristas fechem a mesma solicitação |
| **Desempenho** | Tempo de resposta adequado | Paginação em consultas de listagem e indexação de buscas por status e região no PostgreSQL |
| **Arquitetura** | Separação modular | Monólito modular com padrão *Package by Domain* em Java 21 |
| **Usabilidade** | Interface acessível e responsiva | Design System com tokens Tailwind, contraste WCAG AA e navegação adaptada a desktop e mobile |
| **Observabilidade** | Monitoramento e rastreamento | Logs estruturados com Correlation ID e métricas de saúde via Spring Boot Actuator |

---

## 3. Regras de Negócio (RN)

* **RN-001 (Elegibilidade do Prestador)**: O motorista só pode visualizar e aceitar solicitações após ter a CNH com anotação EAR e o documento do veículo (CRLV) aprovados pela auditoria.
* **RN-002 (Validade de Documentos)**: Documentos com data de validade expirada alteram automaticamente o status do prestador para `INCOMPLETE` ou `SUSPENDED`, bloqueando novos aceites.
* **RN-003 (Exclusividade de Contratação)**: Uma solicitação só pode ter uma única proposta aceita. O aceite deve ser uma transação atômica.
* **RN-004 (Imutabilidade do Contrato)**: Uma vez formalizado o `Booking`, as condições, o valor acordado e a van vinculada não podem ser alterados unilateralmente.
* **RN-005 (Momento da Avaliação)**: A avaliação (`Review`) só pode ser registrada se a viagem estiver com o status `COMPLETED`.
* **RN-006 (Preço Justo da Plataforma)**: O valor sugerido pela plataforma considera um piso operacional mínimo, quilometragem total (ida, volta e paradas) e tempo de espera, desestimulando leilões predatórios.
* **RN-007 (Capacidade do Veículo)**: A quantidade de passageiros da solicitação não pode exceder a capacidade oficial de assentos da van selecionada.
