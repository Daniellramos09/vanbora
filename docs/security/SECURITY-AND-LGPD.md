# VanBora — Guia Prático de Segurança, OWASP e LGPD

Este documento descreve como os princípios de segurança da informação e a Lei Geral de Proteção de Dados (LGPD) são aplicados na arquitetura e no código do **VanBora**.

---

## 1. Mapeamento de Dados e Bases Legais (LGPD)

O princípio fundamental no VanBora é a **minimização de dados**: coletar apenas o estritamente necessário para cada etapa da viagem.

| Dado Pessoal | Titular | Finalidade | Base Legal (LGPD) | Medida de Proteção Técnica |
| :--- | :--- | :--- | :--- | :--- |
| **Nome Completo** | Cliente e Motorista | Identificação no ponto de encontro | Execução de Contrato (Art. 7, V) | Visível na tela de contratação |
| **WhatsApp / Telefone** | Cliente e Motorista | Contato operacional da viagem | Execução de Contrato (Art. 7, V) | Oculto até a viagem ser confirmada |
| **CPF / CNPJ** | Cliente e Motorista | Emissão fiscal e validação de antecedentes | Obrigação Legal / Contrato | Acesso restrito ao titular e auditoria |
| **CNH e CRLV (PDF/Fotos)**| Motorista | Validação de aptidão e vistoria | Tutela de Segurança e Contrato | Armazenamento em Object Storage privado; links temporários (15 min) |
| **Endereço de Embarque** | Cliente / Família | Local de recolhimento dos passageiros | Execução de Contrato | Não exibido no mapa público sem anonimização |
| **Placa do Veículo** | Motorista | Identificação da van pelo grupo | Execução de Contrato | Mascarada no radar público (ex: `ABC-**34`) |

---

## 2. Proteção contra Vulnerabilidades OWASP Top 10

### 2.1 BOLA / IDOR (Broken Object Level Authorization)
* **O Risco:** Um usuário autenticado como Cliente `A` tenta acessar ou alterar a viagem `req-99` pertencente ao Cliente `B` mudando o ID na URL (`GET /api/v1/requests/req-99`).
* **A Defesa no Spring Boot:**
  ```java
  @GetMapping("/{id}")
  public ResponseEntity<ServiceRequestDTO> getRequestById(@PathVariable UUID id, @AuthenticationPrincipal UserPrincipal principal) {
      ServiceRequest request = serviceRequestRepository.findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada"));
      
      // Validação estrita de propriedade
      if (!request.getCustomerId().equals(principal.getId()) && !principal.isAdmin()) {
          throw new AccessDeniedException("Você não tem permissão para visualizar esta solicitação.");
      }
      return ResponseEntity.ok(mapper.toDTO(request));
  }
  ```

### 2.2 XSS (Cross-Site Scripting)
* **A Defesa:**
  1. No frontend: React escapa strings nativamente dentro do JSX (`{text}`), impedindo injeção de `<script>`.
  2. No backend: Tokens JWT trafegam exclusivamente via cookie com a flag `HttpOnly`. Scripts maliciosos executados no navegador não conseguem ler o cookie.

### 2.3 CSRF (Cross-Site Request Forgery)
* **A Defesa:** Cookies configurados com a diretiva `SameSite=Strict`. O navegador recusa o envio do cookie de autenticação se a requisição se originar de um site terceiro.

### 2.4 SQL Injection
* **A Defesa:** Utilização exclusiva do **Spring Data JPA** e queries tipadas (`CriteriaBuilder` ou JPQL com parâmetros nomeados `:param`). Concatenação de SQL com strings é expressamente proibida.

---

## 3. Arquitetura de Armazenamento de Documentos na Nuvem

Arquivos binários (imagens e PDFs de CNH e CRLV) **nunca** devem ser gravados em colunas `BLOB` no PostgreSQL para não sobrecarregar memória e backups.

```
 [ Motorista ] --( 1. Upload Documento )--> [ Backend Spring Boot ]
                                                    │
                                                    ▼
                                          [ 2. Grava no Oracle Cloud ]
                                          [    Object Storage        ]
                                          [    (Bucket Privado)      ]
                                                    │
                                                    ▼
                                          [ 3. Salva apenas Metadata ]
                                          [    no PostgreSQL:        ]
                                          [    - storage_key         ]
                                          [    - expiration_date     ]
                                          [    - status: UNDER_REVIEW]

 [ Administrador ] --( 4. Solicita Auditoria )--> [ Backend Spring Boot ]
                                                          │
                                                          ▼
                                                [ 5. Gera Pre-Signed URL ]
                                                [    com validade de     ]
                                                [    15 minutos          ]
```
Esse fluxo garante que nenhum documento pessoal de motorista ou cliente fique exposto em URL pública da internet.
