# README 02 — Especificação de Requisitos, Regras de Negócio e LGPD

**Projeto:** Marketplace de Transporte por Vans  
**Versão:** 1.0  
**Status:** Em concepção e validação  
**Abrangência inicial:** Grande São Paulo  
**Documento:** Especificação funcional e operacional

---

# 1. Objetivo deste documento

Este documento define os requisitos funcionais (RF), requisitos não funcionais (RNF), regras de negócio (RN), diretrizes de proteção de dados e os principais fluxos operacionais do Marketplace de Transporte por Vans.

Seu objetivo é servir como referência para o planejamento, desenvolvimento e validação do sistema.

O projeto deve ser desenvolvido considerando o contexto descrito no **README 01 — Visão do Produto, Contexto e Modelo de Negócio**.

A plataforma conecta pessoas, empresas e instituições que precisam contratar transporte a proprietários de vans, motoristas e empresas de transporte devidamente habilitados para os serviços oferecidos.

O sistema deve funcionar como um marketplace de intermediação, oferecendo duas possibilidades:

1. **Contratação direta:** quando o serviço possui características simples, disponibilidade e preço previamente definidos.
2. **Solicitação de orçamento:** quando o serviço exige análise, negociação ou propostas personalizadas.

A plataforma não deve ser tratada como uma transportadora com frota própria.

## 1.1. Orientação para o desenvolvimento

Antes de implementar qualquer funcionalidade:

- Leia este documento e o README 01.
- Entenda os diferentes tipos de usuários e suas permissões.
- Respeite as regras de negócio antes de definir a estrutura das telas.
- Não presuma que todos os prestadores podem executar todas as modalidades de transporte.
- Não crie funcionalidades que contrariem as restrições regulatórias descritas.
- Não implemente funcionalidades futuras como se já estivessem aprovadas para o MVP.
- Não invente regras comerciais, taxas, preços ou exigências documentais.
- Quando houver uma decisão pendente, sinalize a pendência em vez de assumir uma resposta.

# 2. Perfis de usuário e permissões

A plataforma terá quatro ambientes principais.

## 2.1. Visitante

Usuário que acessa a plataforma sem autenticação.

Permissões:

- Visualizar a página inicial.
- Conhecer as categorias de transporte.
- Consultar informações sobre a plataforma.
- Visualizar como funciona o serviço.
- Iniciar o cadastro como cliente ou prestador.
- Iniciar uma busca pública, caso essa funcionalidade seja disponibilizada.

Não pode:

- Visualizar documentos privados.
- Acessar informações administrativas.
- Consultar dados pessoais de outros usuários.
- Contratar serviços sem autenticação.

## 2.2. Cliente

Pessoa física, empresa ou instituição que necessita contratar transporte.

Permissões:

- Criar e editar seu perfil.
- Cadastrar dados de uma empresa ou instituição, quando aplicável.
- Criar solicitações de transporte.
- Informar origem, destino, datas, horários e pontos de embarque.
- Informar quantidade de passageiros.
- Pesquisar prestadores compatíveis.
- Receber e comparar propostas.
- Aceitar propostas.
- Realizar contratação direta quando disponível.
- Consultar histórico de solicitações e contratações.
- Acompanhar o status dos serviços.
- Registrar avaliações e ocorrências após uma contratação.
- Solicitar cancelamento conforme as condições aplicáveis.

O cliente só pode visualizar as informações necessárias para suas próprias solicitações e contratações.

## 2.3. Prestador

Pode ser um proprietário de van, motorista independente ou empresa de transporte.

Permissões:

- Criar e editar perfil profissional.
- Cadastrar veículos.
- Enviar documentos para análise.
- Informar modalidades de transporte que pretende oferecer.
- Informar regiões de atendimento.
- Cadastrar disponibilidade.
- Visualizar solicitações compatíveis.
- Enviar propostas.
- Aceitar contratações diretas, quando habilitado.
- Consultar contratos e serviços.
- Acompanhar histórico de atendimentos.
- Consultar avaliações recebidas.
- Registrar ocorrências.
- Atualizar informações profissionais e documentais.

O prestador não deve receber solicitações de modalidades para as quais não tenha sido aprovado.

## 2.4. Administrador

Responsável pela gestão e supervisão da plataforma.

Permissões:

- Consultar usuários cadastrados.
- Analisar cadastros de prestadores.
- Analisar documentos enviados.
- Aprovar, reprovar ou solicitar correções documentais.
- Gerenciar veículos cadastrados.
- Gerenciar categorias de transporte.
- Controlar modalidades habilitadas.
- Consultar solicitações e propostas.
- Consultar contratações.
- Gerenciar denúncias e ocorrências.
- Suspender ou bloquear contas.
- Consultar indicadores operacionais.
- Gerenciar parâmetros comerciais autorizados.

As ações administrativas importantes devem possuir registro de auditoria.

# 3. Requisitos funcionais (RF)

Os requisitos funcionais descrevem as ações que o sistema deverá permitir.

A prioridade será identificada como:

- **MVP:** necessário para a primeira versão funcional.
- **Futuro:** funcionalidade planejada para versões posteriores.
- **Condicional:** depende de validação comercial, jurídica ou regulatória.

## 3.1. Autenticação e cadastro

**RF-001 — Cadastro de usuário (MVP)**

O sistema deverá permitir o cadastro de usuários com informações básicas, como nome, e-mail, telefone e senha.

**RF-002 — Tipo de conta (MVP)**

Durante o cadastro, o usuário deverá selecionar seu perfil inicial:

- Cliente.
- Prestador.

O cadastro empresarial deverá ser uma opção de perfil ou modalidade de cadastro do cliente ou prestador, conforme a arquitetura definida.

**RF-003 — Autenticação (MVP)**

O sistema deverá permitir login e logout com controle de sessão.

**RF-004 — Recuperação de senha (MVP)**

O usuário deverá conseguir solicitar a recuperação de acesso por um canal seguro.

**RF-005 — Edição de perfil (MVP)**

O usuário poderá atualizar seus dados cadastrais, respeitando os campos que exigem nova validação.

**RF-006 — Verificação de contato (MVP)**

O sistema deverá permitir mecanismos de confirmação de e-mail e, futuramente, telefone.

## 3.2. Perfil do cliente

**RF-007 — Perfil de cliente (MVP)**

O cliente deverá possuir uma área com seus dados, solicitações, propostas recebidas e contratações.

**RF-008 — Cadastro empresarial (MVP)**

Clientes empresariais deverão poder informar dados como:

- Razão social.
- Nome fantasia.
- CNPJ.
- Responsável pelo contato.
- E-mail corporativo.
- Telefone.
- Endereço comercial.

Os campos efetivamente obrigatórios devem ser definidos conforme a finalidade da operação.

**RF-009 — Histórico do cliente (MVP)**

O sistema deverá apresentar o histórico de solicitações e contratações realizadas pelo cliente.

## 3.3. Perfil do prestador

**RF-010 — Perfil profissional (MVP)**

O prestador deverá possuir um perfil contendo:

- Nome ou nome empresarial.
- Descrição dos serviços.
- Telefone e e-mail.
- Região de atendimento.
- Categorias pretendidas.
- Veículos cadastrados.
- Situação da aprovação.
- Avaliações, quando disponíveis.

**RF-011 — Cadastro de empresa prestadora (MVP)**

Empresas deverão poder informar CNPJ, razão social, responsáveis e dados de contato.

**RF-012 — Situação cadastral (MVP)**

O sistema deverá apresentar o estado da conta do prestador:

- Cadastro incompleto.
- Em análise.
- Aprovado.
- Pendente de correção.
- Reprovado.
- Suspenso.

A aprovação geral da conta não significa autorização automática para todas as modalidades de transporte.

## 3.4. Veículos e documentação

**RF-013 — Cadastro de veículos (MVP)**

O prestador poderá cadastrar um ou mais veículos.

Informações previstas:

- Modelo.
- Marca.
- Ano.
- Placa.
- Capacidade de passageiros.
- Características relevantes.
- Categoria do veículo.
- Situação cadastral.

**RF-014 — Documentos do veículo (MVP)**

O sistema deverá permitir o envio de documentos relacionados ao veículo, conforme as exigências aplicáveis.

**RF-015 — Documentos do prestador (MVP)**

O sistema deverá permitir o envio de documentos pessoais ou empresariais necessários à validação cadastral.

**RF-016 — Controle de validade (MVP)**

O sistema deverá permitir registrar datas de validade dos documentos que possuam prazo de vencimento.

**RF-017 — Análise documental (MVP)**

O administrador deverá poder:

- Aprovar documentos.
- Reprovar documentos.
- Solicitar correção.
- Registrar motivo da reprovação.
- Consultar o histórico da análise.

**RF-018 — Autorizações por modalidade (MVP/Condicional)**

O sistema deverá permitir registrar a situação das autorizações necessárias para cada modalidade de transporte.

A autorização deverá estar relacionada, conforme aplicável, a:

- Prestador.
- Veículo.
- Motorista.
- Modalidade.
- Território de operação.
- Validade.

Não utilizar apenas um campo booleano como `isAuthorized` para representar toda a situação regulatória.

**RF-019 — Bloqueio por documentação (MVP)**

O sistema deverá impedir que veículos ou prestadores com documentação incompatível, vencida ou não aprovada recebam contratações para as modalidades correspondentes.

A regra deverá considerar as exigências específicas de cada serviço.

## 3.5. Disponibilidade e regiões de atendimento

**RF-020 — Regiões de atendimento (MVP)**

O prestador poderá informar as regiões em que deseja trabalhar.

**RF-021 — Disponibilidade (MVP)**

O prestador poderá informar dias e horários em que possui disponibilidade.

**RF-022 — Atualização de disponibilidade (MVP)**

O prestador deverá conseguir atualizar sua disponibilidade.

**RF-023 — Bloqueio de conflitos (MVP)**

O sistema deverá evitar que um mesmo veículo seja comprometido em duas contratações incompatíveis de horário.

**RF-024 — Calendário avançado (Futuro)**

Poderá ser implementado um calendário com gerenciamento de recorrências, bloqueios e disponibilidade por veículo.

## 3.6. Solicitações de transporte

**RF-025 — Criar solicitação (MVP)**

O cliente deverá conseguir criar uma solicitação de transporte.

Dados previstos:

- Categoria do serviço.
- Origem.
- Destino.
- Data.
- Horário de saída.
- Horário de retorno, quando aplicável.
- Quantidade de passageiros.
- Necessidade de ida e volta.
- Frequência do serviço.
- Informações adicionais.

**RF-026 — Múltiplos pontos de embarque (MVP)**

O cliente deverá poder informar diferentes pontos de embarque e desembarque.

Cada ponto poderá conter:

- Endereço.
- Referência de localização.
- Quantidade estimada de passageiros.
- Ordem de parada.
- Observações.

**RF-027 — Informações complementares (MVP)**

O cliente poderá informar detalhes como:

- Necessidade de espera.
- Quantidade de paradas.
- Bagagens.
- Necessidade de acessibilidade.
- Características específicas do serviço.

**RF-028 — Solicitação recorrente (MVP)**

O cliente deverá conseguir indicar quando o transporte será recorrente.

Exemplos:

- Segunda a sexta-feira.
- Segunda a sábado.
- Dias específicos da semana.
- Período determinado.

**RF-029 — Detalhes da solicitação (MVP)**

O cliente deverá conseguir consultar os detalhes e o status de suas solicitações.

**RF-030 — Edição de solicitação (MVP)**

O cliente poderá editar uma solicitação enquanto não houver contratação confirmada, respeitando as regras de alteração.

**RF-031 — Cancelamento de solicitação (MVP)**

O cliente poderá cancelar uma solicitação conforme seu estado atual e as regras de negócio.

## 3.7. Busca e compatibilidade

**RF-032 — Busca de prestadores (MVP)**

O sistema deverá permitir buscar prestadores com base em critérios como:

- Região.
- Categoria.
- Capacidade de passageiros.
- Disponibilidade.
- Modalidade habilitada.
- Compatibilidade com a rota.

**RF-033 — Filtros (MVP)**

O cliente poderá filtrar resultados conforme os critérios disponíveis.

**RF-034 — Compatibilidade operacional (MVP)**

O sistema deverá evitar exibir como opção de contratação prestadores que não atendam aos requisitos mínimos da solicitação.

**RF-035 — Ordenação de resultados (Futuro)**

O sistema poderá ordenar os resultados considerando distância, avaliação, preço, pontualidade e adequação ao serviço.

A ordenação não deverá substituir as verificações obrigatórias de compatibilidade.

## 3.8. Propostas e orçamentos

**RF-036 — Recebimento de solicitações (MVP)**

Prestadores compatíveis poderão visualizar solicitações disponíveis.

**RF-037 — Envio de proposta (MVP)**

O prestador poderá enviar uma proposta contendo:

- Valor total.
- Veículo oferecido.
- Condições do serviço.
- Disponibilidade.
- Observações.
- Validade da proposta.

**RF-038 — Edição de proposta (MVP)**

O prestador poderá editar uma proposta enquanto ela não tiver sido aceita, respeitando as regras de negociação.

**RF-039 — Comparação de propostas (MVP)**

O cliente deverá conseguir comparar propostas recebidas.

**RF-040 — Aceite de proposta (MVP)**

O cliente poderá aceitar uma proposta.

O aceite deverá iniciar o processo de contratação e bloquear a possibilidade de aceitar propostas incompatíveis para o mesmo serviço.

**RF-041 — Recusa de proposta (MVP)**

O cliente poderá recusar propostas.

**RF-042 — Histórico de propostas (MVP)**

Cliente e prestador deverão consultar o histórico de propostas relacionadas às suas solicitações.

## 3.9. Contratação direta

**RF-043 — Serviços com contratação direta (MVP/Condicional)**

O sistema poderá permitir contratação direta de serviços com condições previamente definidas.

A funcionalidade só deverá estar disponível quando:

- A categoria estiver liberada.
- O prestador estiver aprovado para aquela modalidade.
- O veículo estiver regular e compatível.
- A disponibilidade estiver confirmada.
- As condições comerciais estiverem definidas.

**RF-044 — Confirmação da contratação (MVP)**

Antes de confirmar, o sistema deverá apresentar ao cliente um resumo das condições do serviço.

**RF-045 — Registro da contratação (MVP)**

Toda contratação deverá possuir um identificador único e um registro com os dados acordados.

## 3.10. Contratos e acompanhamento

**RF-046 — Registro do serviço contratado (MVP)**

O sistema deverá armazenar os dados da contratação:

- Cliente.
- Prestador.
- Veículo.
- Modalidade.
- Origem e destino.
- Datas e horários.
- Valor acordado.
- Condições.
- Status.

**RF-047 — Consulta de contratação (MVP)**

Cliente e prestador poderão consultar os detalhes do serviço contratado.

**RF-048 — Contratos digitais (Futuro)**

A plataforma poderá disponibilizar geração e assinatura eletrônica de contratos.

**RF-049 — Histórico de serviços (MVP)**

O sistema deverá manter o histórico de serviços realizados e cancelados.

**RF-050 — Acompanhamento operacional (Futuro)**

Poderá ser implementado acompanhamento em tempo real, desde que exista justificativa operacional e tratamento adequado dos dados de localização.

## 3.11. Pagamentos e comissões

**RF-051 — Registro financeiro (MVP)**

O sistema deverá permitir registrar o valor acordado e a situação financeira da contratação.

No MVP, o acompanhamento poderá ser manual, sem processamento de pagamentos pela plataforma.

**RF-052 — Status financeiro (MVP)**

O sistema poderá apresentar estados como:

- Aguardando pagamento.
- Pagamento informado.
- Pago.
- Pendente.
- Reembolsado.
- Cancelado.

A utilização desses estados deverá refletir o processo financeiro realmente adotado.

**RF-053 — Comissão da plataforma (Futuro/Condicional)**

A plataforma poderá calcular uma comissão sobre contratações realizadas.

O percentual e a forma de cobrança ainda precisam ser validados comercial e juridicamente.

Não fixar percentuais no código como se fossem definitivos.

**RF-054 — Gateway de pagamento (Futuro)**

A plataforma poderá integrar um intermediador de pagamentos compatível com marketplace.

A integração deverá considerar:

- Divisão de pagamentos.
- Repasse ao prestador.
- Taxas.
- Reembolsos.
- Cancelamentos.
- Identificação das partes.
- Conciliação financeira.

Não implementar pagamentos reais antes da definição do modelo operacional, jurídico e financeiro.

## 3.12. Avaliações e ocorrências

**RF-055 — Avaliação pós-serviço (Futuro)**

O cliente poderá avaliar o serviço após sua conclusão.

**RF-056 — Avaliação do prestador (Futuro)**

O sistema poderá apresentar avaliações relacionadas ao prestador.

**RF-057 — Registro de ocorrência (MVP)**

O cliente e o prestador deverão ter um canal para registrar ocorrências relacionadas a uma contratação.

**RF-058 — Gestão de ocorrências (MVP)**

O administrador poderá consultar, classificar e acompanhar ocorrências.

**RF-059 — Denúncias (Futuro)**

O sistema poderá permitir denúncias de comportamento inadequado, fraude ou descumprimento de condições.

## 3.13. Administração

**RF-060 — Painel administrativo (MVP)**

O sistema deverá possuir um ambiente administrativo protegido.

**RF-061 — Gestão de usuários (MVP)**

O administrador poderá consultar e gerenciar contas.

**RF-062 — Gestão documental (MVP)**

O administrador poderá analisar documentos e acompanhar vencimentos.

**RF-063 — Gestão de categorias (MVP)**

O administrador poderá habilitar ou desabilitar categorias de transporte.

**RF-064 — Gestão de solicitações (MVP)**

O administrador poderá consultar solicitações e acompanhar situações que demandem intervenção.

**RF-065 — Gestão de contratações (MVP)**

O administrador poderá consultar contratações e seus respectivos estados.

**RF-066 — Indicadores administrativos (Futuro)**

O painel poderá apresentar:

- Quantidade de prestadores cadastrados.
- Prestadores aprovados.
- Solicitações recebidas.
- Solicitações atendidas.
- Propostas enviadas.
- Contratações concluídas.
- Cancelamentos.
- Volume financeiro movimentado.

**RF-067 — Auditoria administrativa (MVP)**

O sistema deverá registrar ações administrativas relevantes, identificando o responsável, a ação e o momento em que ocorreu.

## 3.14. Notificações

**RF-068 — Notificações internas (MVP)**

O sistema deverá apresentar notificações sobre mudanças importantes.

Exemplos:

- Nova solicitação compatível.
- Nova proposta recebida.
- Proposta aceita.
- Contratação confirmada.
- Documento aprovado.
- Documento reprovado.
- Solicitação alterada ou cancelada.

**RF-069 — Notificações externas (Futuro)**

Poderão ser implementadas notificações por e-mail, WhatsApp ou outros canais, respeitando as preferências e bases legais aplicáveis.

# 4. Requisitos não funcionais (RNF)

Os requisitos não funcionais definem critérios de qualidade, segurança, desempenho e manutenção.

## 4.1. Segurança

**RNF-001 — Autenticação segura**

As senhas não poderão ser armazenadas em texto puro. Utilizar mecanismo seguro de hash de senha.

**RNF-002 — Autorização de acesso**

Cada perfil deverá acessar somente as funcionalidades e informações permitidas.

A autorização deverá ser validada no backend, não apenas pela interface.

**RNF-003 — Proteção de documentos**

Documentos pessoais, empresariais e veiculares não poderão ser disponibilizados publicamente.

**RNF-004 — Comunicação segura**

A aplicação deverá utilizar HTTPS em ambientes de produção.

**RNF-005 — Proteção contra ataques**

Adotar medidas contra vulnerabilidades comuns, incluindo injeção, XSS, CSRF quando aplicável, exposição indevida de dados e tentativas abusivas de autenticação.

**RNF-006 — Gestão de sessão**

Implementar mecanismos adequados de expiração, renovação e encerramento de sessão.

## 4.2. Privacidade

**RNF-007 — Minimização de dados**

Coletar apenas os dados necessários para cada funcionalidade.

**RNF-008 — Controle de acesso aos dados**

Informações privadas deverão ser acessíveis somente por usuários autorizados e quando houver finalidade legítima.

**RNF-009 — Retenção de dados**

A plataforma deverá possuir critérios documentados para retenção e descarte de dados.

**RNF-010 — Rastreabilidade**

Ações relevantes envolvendo dados e documentos deverão possuir registros de auditoria.

## 4.3. Usabilidade e acessibilidade

**RNF-011 — Responsividade**

A plataforma deverá funcionar em celulares, tablets e computadores.

**RNF-012 — Mobile-first**

As interfaces deverão ser planejadas prioritariamente para dispositivos móveis, considerando que parte dos clientes e prestadores utilizará o celular como principal meio de acesso.

**RNF-013 — Acessibilidade**

A interface deverá buscar conformidade com boas práticas de acessibilidade, considerando WCAG como referência.

**RNF-014 — Clareza das informações**

Formulários, botões, mensagens de erro e confirmações deverão utilizar linguagem simples.

**RNF-015 — Feedback visual**

O sistema deverá informar claramente quando uma ação estiver sendo processada, concluída ou apresentar erro.

## 4.4. Desempenho e disponibilidade

**RNF-016 — Desempenho**

Consultas e operações comuns deverão apresentar tempo de resposta adequado à utilização cotidiana.

Metas numéricas de desempenho deverão ser definidas após testes e avaliação da infraestrutura.

**RNF-017 — Paginação**

Listagens extensas deverão utilizar paginação ou carregamento incremental.

**RNF-018 — Disponibilidade**

A aplicação deverá ser estruturada para operar de forma estável, com monitoramento de falhas.

## 4.5. Manutenção e arquitetura

**RNF-019 — Organização do código**

O código deverá possuir separação clara de responsabilidades.

**RNF-020 — API**

O backend deverá expor uma API organizada e documentada.

**RNF-021 — Integridade dos dados**

Operações críticas deverão preservar consistência, especialmente em propostas, contratações e disponibilidade de veículos.

**RNF-022 — Tratamento de erros**

Erros deverão ser tratados de maneira padronizada, sem expor detalhes internos da aplicação ao usuário.

**RNF-023 — Logs**

A aplicação deverá possuir logs úteis para diagnóstico, sem registrar senhas, tokens ou documentos sensíveis em texto aberto.

**RNF-024 — Backup**

Deverá existir estratégia de backup e recuperação do banco de dados.

**RNF-025 — Testabilidade**

As principais regras de negócio deverão possuir testes automatizados.

**RNF-026 — Compatibilidade**

A aplicação deverá funcionar nas versões atuais dos principais navegadores utilizados no Brasil.

## 4.6. Arquivos e documentos

**RNF-027 — Upload seguro**

O sistema deverá validar tamanho, extensão e tipo real dos arquivos enviados.

**RNF-028 — Armazenamento**

Documentos deverão ser armazenados em ambiente protegido, preferencialmente em serviço de armazenamento de objetos com controle de acesso.

**RNF-029 — Integridade documental**

O sistema deverá relacionar cada documento ao usuário, veículo ou autorização correspondente.

**RNF-030 — Expiração**

Documentos com validade deverão possuir mecanismo de acompanhamento de vencimento.

# 5. Regras de negócio (RN)

As regras de negócio são obrigatórias e devem ser consideradas em todas as camadas da aplicação.

Não devem existir apenas como validações visuais no frontend.

## 5.1. Regras de cadastro e aprovação

**RN-001 — Cadastro não significa aprovação**

Um prestador cadastrado não estará automaticamente autorizado a receber contratações.

**RN-002 — Aprovação por modalidade**

A aprovação deverá considerar a modalidade de transporte que o prestador deseja oferecer.

**RN-003 — Veículo aprovado**

Um veículo somente poderá ser utilizado em uma contratação quando atender aos requisitos aplicáveis e estiver aprovado na plataforma.

**RN-004 — Documentação válida**

Documentos vencidos, reprovados ou pendentes não poderão ser considerados válidos para uma operação que dependa deles.

**RN-005 — Atualização documental**

Quando um documento obrigatório vencer, o sistema deverá alterar sua situação e impedir novas contratações que dependam dele, conforme a regra aplicável.

**RN-006 — Múltiplos veículos**

Um prestador poderá possuir vários veículos, cada um com documentação e situação próprias.

**RN-007 — Motorista identificado**

O sistema deverá identificar o motorista responsável pela operação quando isso for necessário para a modalidade contratada.

A possibilidade de substituição de motorista dependerá da validação dos requisitos aplicáveis.

## 5.2. Regras de capacidade e compatibilidade

**RN-008 — Capacidade máxima**

Uma contratação nunca poderá ultrapassar a capacidade legal e documental do veículo.

**RN-009 — Compatibilidade de modalidade**

O veículo e o prestador deverão estar habilitados para a modalidade de transporte solicitada.

**RN-010 — Compatibilidade territorial**

A operação deverá respeitar as exigências territoriais e regulatórias aplicáveis à rota.

**RN-011 — Compatibilidade de horário**

O sistema deverá impedir conflitos de horário que comprometam a disponibilidade do veículo.

**RN-012 — Compatibilidade operacional**

Uma proposta só poderá ser aceita quando o prestador, o veículo e as condições operacionais forem compatíveis com o serviço.

**RN-013 — Categoria não habilitada**

Uma categoria não deverá ser liberada automaticamente para todos os prestadores.

## 5.3. Regras de solicitações e propostas

**RN-014 — Dados mínimos**

Uma solicitação deverá conter informações suficientes para que o prestador compreenda o serviço.

**RN-015 — Proposta vinculada**

Toda proposta deverá estar vinculada a uma solicitação existente.

**RN-016 — Validade da proposta**

Uma proposta poderá possuir prazo de validade.

**RN-017 — Aceite único**

Uma solicitação não poderá gerar contratações incompatíveis entre si.

**RN-018 — Alteração após aceite**

Após uma proposta ser aceita, alterações relevantes deverão seguir um processo específico de atualização ou renegociação.

**RN-019 — Histórico**

Alterações relevantes de solicitações, propostas e contratações deverão ser registradas.

**RN-020 — Cancelamento**

Cancelamentos deverão respeitar o estado atual da solicitação ou contratação e as condições previamente acordadas.

## 5.4. Regras de contratação direta

**RN-021 — Disponibilidade confirmada**

A contratação direta somente poderá ocorrer quando a disponibilidade do prestador e do veículo estiver confirmada.

**RN-022 — Condições transparentes**

O cliente deverá visualizar valor, modalidade, horários, capacidade e condições antes de confirmar.

**RN-023 — Prestador habilitado**

A contratação direta deverá estar limitada a prestadores aprovados para a modalidade correspondente.

**RN-024 — Registro**

Toda contratação deverá gerar um registro consultável pelas partes autorizadas.

## 5.5. Regras de precificação

**RN-025 — Preço não baseado apenas em quilometragem**

O cálculo de um serviço poderá considerar:

- Distância total.
- Deslocamento até o primeiro embarque.
- Retorno vazio.
- Tempo de operação.
- Quantidade de passageiros.
- Quantidade de pontos de embarque.
- Tempo de espera.
- Pedágios.
- Estacionamentos.
- Custos operacionais.
- Mão de obra.
- Margem do prestador.

**RN-026 — Múltiplos embarques**

A quantidade de pontos de embarque poderá influenciar o valor do serviço, mesmo quando a distância final for semelhante.

**RN-027 — Orçamento estimado**

Valores apresentados como estimativa não deverão ser tratados como preço final garantido.

**RN-028 — Valor acordado**

Após a contratação, o valor acordado deverá ser registrado e permanecer associado à operação.

**RN-029 — Parâmetros comerciais**

Taxas, comissões e regras financeiras deverão ser configuráveis e dependerão de validação antes de serem utilizadas comercialmente.

## 5.6. Regras de recorrência

**RN-030 — Contratação recorrente**

Serviços recorrentes deverão possuir período, frequência e condições claramente definidos.

**RN-031 — Disponibilidade recorrente**

O sistema deverá considerar a disponibilidade do veículo em todos os dias e horários envolvidos.

**RN-032 — Alterações de recorrência**

Alterações em uma contratação recorrente deverão ser registradas e comunicadas às partes envolvidas.

## 5.7. Regras de confiança e segurança

**RN-033 — Avaliação vinculada**

Avaliações deverão estar relacionadas a contratações reais.

**RN-034 — Ocorrências**

Ocorrências deverão estar vinculadas à solicitação ou contratação correspondente, quando aplicável.

**RN-035 — Suspensão**

A administração poderá suspender prestadores ou clientes quando houver justificativa operacional ou violação das regras da plataforma.

**RN-036 — Dados privados**

Nenhum usuário poderá acessar documentos privados ou informações pessoais de outros usuários sem autorização e finalidade legítima.

**RN-037 — Menores de idade**

Serviços envolvendo crianças e adolescentes exigirão cuidados adicionais, validação dos requisitos específicos da modalidade e tratamento especial dos dados pessoais envolvidos.

A plataforma não deverá presumir que o simples cadastro do prestador autoriza o transporte de menores.

# 6. Proteção de dados e LGPD

A plataforma deverá ser projetada considerando a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).

A implementação técnica não representa, por si só, garantia de conformidade jurídica.

O enquadramento das partes e das responsabilidades deverá ser validado juridicamente antes da operação comercial.

## 6.1. Papéis e responsabilidades

Deverá ser definido, com apoio jurídico, quem atuará como:

- Controlador dos dados pessoais.
- Operador dos dados pessoais.
- Encarregado, quando aplicável.

A plataforma poderá compartilhar informações com prestadores para viabilizar uma contratação. Esse compartilhamento deverá ser limitado ao necessário para a finalidade da operação.

## 6.2. Princípios de tratamento

O sistema deverá observar:

- Finalidade.
- Adequação.
- Necessidade.
- Livre acesso.
- Qualidade dos dados.
- Transparência.
- Segurança.
- Prevenção.
- Não discriminação.
- Responsabilização e prestação de contas.

## 6.3. Coleta de dados

A plataforma deverá solicitar somente as informações necessárias para:

- Cadastro.
- Identificação.
- Validação documental.
- Busca de transporte.
- Contratação.
- Comunicação entre as partes.
- Gestão financeira.
- Segurança e prevenção de fraudes.

Não solicitar documentos sem justificativa operacional ou legal.

## 6.4. Dados de crianças e adolescentes

Quando uma solicitação envolver transporte de crianças ou adolescentes:

- Coletar apenas as informações estritamente necessárias.
- Não tornar dados de menores públicos.
- Evitar exposição de nomes completos, endereços e rotinas.
- Restringir o acesso às informações às pessoas autorizadas.
- Avaliar a necessidade de participação dos responsáveis legais.
- Considerar o melhor interesse da criança ou adolescente.
- Validar juridicamente os procedimentos específicos.

Dados de menores exigem atenção especial e não devem ser tratados como dados comuns de cadastro.

## 6.5. Direitos dos titulares

A plataforma deverá prever mecanismos para que os titulares possam exercer seus direitos previstos na LGPD, conforme aplicável:

- Confirmação da existência de tratamento.
- Acesso aos dados.
- Correção de informações.
- Solicitação de anonimização, bloqueio ou eliminação, quando cabível.
- Informação sobre compartilhamento.
- Revogação de consentimento, quando essa for a base legal utilizada.
- Demais direitos previstos na legislação.

Deverá existir um canal de contato para solicitações relacionadas à privacidade.

## 6.6. Bases legais

Não utilizar consentimento como base legal automática para todo tratamento.

Cada finalidade deverá possuir uma base legal adequada, definida com orientação jurídica.

Exemplos de situações que exigem avaliação:

- Execução de contrato.
- Procedimentos preliminares relacionados a contrato.
- Cumprimento de obrigação legal ou regulatória.
- Exercício regular de direitos.
- Legítimo interesse, quando aplicável e após avaliação.
- Consentimento, quando necessário.

## 6.7. Armazenamento e segurança

O sistema deverá:

- Proteger dados em trânsito.
- Utilizar controles de acesso.
- Restringir documentos privados.
- Evitar exposição de dados em logs.
- Manter registros de acesso e operações relevantes.
- Possuir política de retenção.
- Ter processo de descarte seguro.
- Definir procedimentos para incidentes de segurança.

## 6.8. Compartilhamento de informações

O cliente deverá visualizar apenas as informações necessárias para avaliar e contratar um prestador.

O prestador deverá visualizar apenas as informações necessárias para avaliar e executar a solicitação.

A plataforma não deverá disponibilizar publicamente documentos pessoais, dados de identificação, endereços residenciais ou informações operacionais sensíveis.

## 6.9. Documentação de privacidade

Antes da operação comercial, deverão ser preparados e revisados:

- Política de Privacidade.
- Termos de Uso.
- Política de retenção e descarte.
- Procedimentos de atendimento aos titulares.
- Procedimento de resposta a incidentes.
- Contratos e cláusulas de tratamento de dados com fornecedores, quando aplicável.

# 7. Estados e fluxos do sistema

Os estados abaixo servem como referência para a implementação.

## 7.1. Estado do prestador

- `INCOMPLETE`: cadastro incompleto.
- `UNDER_REVIEW`: em análise.
- `APPROVED`: aprovado.
- `CORRECTION_REQUIRED`: precisa corrigir informações.
- `REJECTED`: reprovado.
- `SUSPENDED`: suspenso.

A aprovação geral deverá ser complementada pela validação das modalidades, veículos e autorizações correspondentes.

## 7.2. Estado da solicitação

- `DRAFT`: rascunho.
- `PUBLISHED`: publicada.
- `RECEIVING_PROPOSALS`: recebendo propostas.
- `PROPOSAL_ACCEPTED`: proposta aceita.
- `CONTRACTED`: contratação confirmada.
- `IN_PROGRESS`: em andamento.
- `COMPLETED`: concluída.
- `CANCELLED`: cancelada.
- `EXPIRED`: expirada.

Os estados deverão possuir transições controladas. Não permitir que um usuário altere livremente o status de uma contratação.

## 7.3. Estado da proposta

- `PENDING`: aguardando avaliação.
- `ACCEPTED`: aceita.
- `REJECTED`: recusada.
- `WITHDRAWN`: retirada pelo prestador.
- `EXPIRED`: expirada.

## 7.4. Estado da documentação

- `NOT_SUBMITTED`: não enviada.
- `UNDER_REVIEW`: em análise.
- `APPROVED`: aprovada.
- `REJECTED`: reprovada.
- `EXPIRED`: vencida.
- `CORRECTION_REQUIRED`: precisa de correção.

## 7.5. Estado da contratação

- `PENDING_CONFIRMATION`: aguardando confirmação.
- `CONFIRMED`: confirmada.
- `IN_PROGRESS`: em andamento.
- `COMPLETED`: concluída.
- `CANCELLED`: cancelada.
- `DISPUTED`: em análise de ocorrência ou disputa.

Os estados de contratação devem ser separados dos estados financeiros. Uma contratação concluída, por exemplo, não significa necessariamente que o pagamento foi conciliado.

# 8. Fluxos principais

## 8.1. Fluxo do cliente

1. Acessa a plataforma.
2. Realiza cadastro.
3. Completa o perfil.
4. Informa a necessidade de transporte.
5. Preenche origem, destino, datas, horários e passageiros.
6. Informa pontos de embarque, quando necessários.
7. Publica a solicitação.
8. Recebe propostas de prestadores compatíveis.
9. Compara valores e condições.
10. Seleciona uma proposta.
11. Confirma a contratação.
12. Acompanha os dados do serviço.
13. Após a realização, poderá registrar avaliação ou ocorrência.

Para serviços habilitados à contratação direta, o fluxo poderá ser reduzido.

## 8.2. Fluxo do prestador

1. Acessa a plataforma.
2. Realiza cadastro profissional.
3. Completa seus dados.
4. Cadastra veículos.
5. Envia documentos.
6. Informa as modalidades pretendidas.
7. Aguarda análise administrativa.
8. Após aprovação, informa disponibilidade e regiões de atendimento.
9. Visualiza solicitações compatíveis.
10. Envia propostas.
11. Aguarda aceite.
12. Consulta a contratação confirmada.
13. Executa o serviço.
14. Atualiza o status conforme as funcionalidades disponíveis.

## 8.3. Fluxo administrativo

1. Acessa o painel administrativo.
2. Consulta novos cadastros.
3. Analisa informações e documentos.
4. Aprova, reprova ou solicita correções.
5. Verifica veículos e modalidades.
6. Acompanha solicitações e contratações.
7. Analisa ocorrências.
8. Registra ações administrativas relevantes.

# 9. Casos de borda e situações que precisam ser tratadas

O sistema deverá considerar situações como:

- Prestador com documentação vencida após ter recebido uma solicitação.
- Veículo com capacidade inferior à quantidade de passageiros.
- Prestador que envia proposta e depois perde a disponibilidade.
- Cliente que altera a data após receber propostas.
- Duas contratações que disputam o mesmo veículo e horário.
- Proposta aceita simultaneamente por mais de um cliente devido a concorrência de requisições.
- Solicitação sem propostas.
- Prestador que cancela um serviço confirmado.
- Cliente que cancela uma contratação.
- Documento reprovado durante uma contratação ainda não realizada.
- Falha de comunicação ou indisponibilidade do sistema.
- Serviço recorrente com conflito em apenas um dos dias.
- Alteração de veículo ou motorista após a contratação.
- Solicitação envolvendo crianças ou adolescentes.

Para operações críticas, o backend deverá utilizar transações e mecanismos de concorrência adequados para evitar duplicidade de contratação e inconsistência de disponibilidade.

# 10. Critérios de aceite do MVP

A primeira versão será considerada funcional quando atender aos seguintes critérios:

## Cadastro e acesso

- [ ] Cliente consegue criar uma conta.
- [ ] Prestador consegue criar uma conta.
- [ ] Usuário consegue autenticar e encerrar sessão.
- [ ] Cada perfil possui acesso às funcionalidades correspondentes.

## Prestadores e veículos

- [ ] Prestador consegue cadastrar um ou mais veículos.
- [ ] Prestador consegue enviar documentos.
- [ ] Administrador consegue analisar documentos.
- [ ] O sistema identifica prestadores aprovados e pendentes.
- [ ] O sistema impede contratação em modalidades não habilitadas.

## Solicitações e propostas

- [ ] Cliente consegue criar uma solicitação.
- [ ] Cliente consegue informar origem e destino.
- [ ] Cliente consegue informar quantidade de passageiros.
- [ ] Cliente consegue cadastrar múltiplos pontos de embarque.
- [ ] Prestadores compatíveis conseguem visualizar solicitações.
- [ ] Prestador consegue enviar uma proposta.
- [ ] Cliente consegue comparar propostas.
- [ ] Cliente consegue aceitar uma proposta.

## Contratação e administração

- [ ] O aceite gera um registro de contratação.
- [ ] Cliente e prestador conseguem consultar a contratação.
- [ ] O sistema evita contratações incompatíveis para o mesmo veículo.
- [ ] Administrador consegue consultar usuários, veículos e solicitações.
- [ ] As ações administrativas importantes são registradas.

## Segurança e experiência

- [ ] A aplicação funciona em dispositivos móveis.
- [ ] Documentos privados não ficam publicamente acessíveis.
- [ ] O backend valida permissões.
- [ ] O sistema trata erros sem expor informações internas.
- [ ] As principais regras de negócio possuem testes.

# 11. Organização técnica sugerida

A tecnologia inicialmente considerada para o projeto:

**Frontend**
- React.
- Vite.
- TypeScript, caso seja adotado para melhorar a segurança de tipos.
- Biblioteca de componentes definida conforme o README 03.

**Backend**
- Java.
- Spring Boot.
- API REST.
- Spring Security.
- Bean Validation.

**Banco de dados**
- PostgreSQL.

**Infraestrutura futura**
- Armazenamento de documentos em serviço de objetos.
- Serviço de mapas e cálculo de rotas.
- Serviço de notificações.
- Gateway de pagamento para marketplace.
- Monitoramento e observabilidade.

A arquitetura deverá ser modular e permitir evolução sem introduzir complexidade desnecessária no MVP.

A definição das tecnologias não autoriza a implementação automática de integrações pagas ou serviços externos.

# 12. Diretrizes para desenvolvimento com IA

Ao utilizar Antigravity ou outras ferramentas de IA:

1. Leia os três documentos de referência antes de propor mudanças estruturais.
2. Não implemente todo o sistema em uma única etapa.
3. Priorize fluxos completos e funcionais em vez de telas isoladas.
4. Não crie dados fictícios como se fossem cadastros reais.
5. Utilize dados de demonstração claramente identificados quando necessário.
6. Não invente regras regulatórias.
7. Não considere uma autorização válida sem análise da modalidade correspondente.
8. Não coloque validações críticas somente no frontend.
9. Não exponha documentos ou informações privadas.
10. Não altere funcionalidades existentes sem analisar os impactos.
11. Não implemente pagamentos reais sem autorização e definição do processo.
12. Documente decisões técnicas importantes.
13. Escreva testes para as regras de negócio.
14. Informe quando um requisito não estiver suficientemente definido.

## 12.1. Ordem recomendada de desenvolvimento

**Etapa 1 — Estrutura inicial**
- Organização do frontend e backend.
- Configuração do banco de dados.
- Autenticação.
- Perfis de usuário.
- Controle de permissões.

**Etapa 2 — Prestadores**
- Perfil profissional.
- Cadastro de veículos.
- Envio de documentos.
- Painel administrativo de aprovação.
- Modalidades e regiões de atendimento.

**Etapa 3 — Clientes e solicitações**
- Perfil de cliente.
- Cadastro de solicitações.
- Pontos de embarque.
- Categorias.
- Histórico.

**Etapa 4 — Marketplace**
- Busca de prestadores.
- Compatibilidade.
- Recebimento de solicitações.
- Envio de propostas.
- Comparação e aceite.

**Etapa 5 — Contratação**
- Registro de contratação.
- Controle de disponibilidade.
- Estados e histórico.
- Cancelamentos básicos.

**Etapa 6 — Validação**
- Testes funcionais.
- Testes de regras de negócio.
- Testes de permissões.
- Testes de responsividade.
- Testes com clientes e prestadores reais.

# 13. Funcionalidades que não devem ser priorizadas no MVP

As funcionalidades abaixo podem ser interessantes, mas não devem atrasar a primeira versão:

- Rastreamento GPS em tempo real.
- Aplicativo mobile nativo.
- Inteligência artificial para recomendação de prestadores.
- Precificação automática avançada.
- Roteirização otimizada.
- Integração completa com gateways de pagamento.
- Assinatura digital avançada.
- Gestão completa de frotas.
- Relatórios financeiros avançados.
- Chat em tempo real.
- Substituição automática de motoristas ou veículos.

Essas funcionalidades deverão ser avaliadas após validação da operação inicial.

# 14. Pendências que exigem validação

As seguintes decisões não devem ser assumidas como definitivas durante o desenvolvimento:

- Modalidades que serão liberadas na primeira versão.
- Documentos exigidos para cada modalidade.
- Requisitos regulatórios por território e tipo de operação.
- Responsabilidades jurídicas da plataforma e dos prestadores.
- Regras de cancelamento e reembolso.
- Percentuais e cobrança de comissão.
- Modelo de pagamento e repasse.
- Responsabilidade pelo atendimento de ocorrências.
- Política de retenção de documentos.
- Procedimentos específicos para transporte de crianças e adolescentes.
- Critérios de aprovação e suspensão de prestadores.

Essas definições deverão ser validadas com profissionais especializados e com a operação real.

# 15. Princípio central do sistema

O objetivo não é simplesmente permitir que alguém anuncie uma van e outra pessoa contrate.

O objetivo é construir um ambiente confiável em que:

- Clientes encontrem opções de transporte compatíveis com suas necessidades.
- Prestadores encontrem oportunidades de trabalho.
- Empresas e instituições consigam solicitar serviços personalizados.
- Propostas e contratações tenham condições transparentes.
- A plataforma acompanhe a operação e ajude a construir confiança entre as partes.

**Toda funcionalidade deverá contribuir para a conexão, a contratação segura e a organização dos serviços de transporte.**
