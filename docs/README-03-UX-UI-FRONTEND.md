# README 03 — UX/UI, Identidade Visual e Frontend

**Projeto:** Marketplace de Transporte por Vans  
**Versão:** 1.0  
**Status:** Direção visual e experiência em definição  
**Abrangência inicial:** Grande São Paulo  
**Documento:** Especificação de experiência e interface

---

# 1. Objetivo deste documento

Este documento define a direção visual, a experiência do usuário, a arquitetura de navegação e as diretrizes de desenvolvimento frontend do Marketplace de Transporte por Vans.

Seu propósito é orientar a criação de uma plataforma que seja:

- Moderna e visualmente agradável.
- Simples de compreender.
- Acessível para diferentes públicos.
- Responsiva, com prioridade para dispositivos móveis.
- Confiável para clientes e prestadores.
- Consistente entre as diferentes áreas do sistema.
- Fácil de utilizar, mesmo por pessoas com pouca familiaridade com tecnologia.

A experiência deverá ser construída considerando o contexto do README 01 e os requisitos e regras descritos no README 02.

## 1.1. Direção geral

A plataforma deve transmitir três ideias principais:

1. **Conexão:** aproximar quem precisa de transporte de quem oferece o serviço.
2. **Confiança:** transmitir segurança e transparência durante a contratação.
3. **Simplicidade:** facilitar a busca, a comparação e a organização dos serviços.

Não queremos criar apenas um site de anúncios de vans.

A interface deve comunicar que existe uma plataforma organizada por trás da conexão entre clientes e prestadores.

# 2. Referência visual e identidade

## 2.1. Referência principal: Skeelo

Site de referência: https://skeelo.com/

A Skeelo será utilizada como inspiração de linguagem visual, especialmente em aspectos como:

- Elementos ilustrados e cartoon.
- Composição visual amigável.
- Formas orgânicas.
- Uso equilibrado de cores.
- Elementos gráficos que ajudam a explicar funcionalidades.
- Comunicação visual menos corporativa e menos rígida.
- Sensação de produto digital acessível.

A intenção não é reproduzir a identidade da Skeelo, seus componentes ou suas telas.

Queremos adaptar a sensação visual para o contexto de transporte e mobilidade.

**Direção desejada:** uma plataforma que combine a organização de um marketplace profissional com uma identidade visual humana e acessível.

## 2.2. O que queremos evitar

Não utilizar:

- Aparência genérica de dashboard SaaS.
- Excesso de gradientes.
- Muitos elementos flutuantes sem função.
- Cards para absolutamente todas as informações.
- Ícones genéricos em excesso.
- Ilustrações 3D exageradas.
- Sombras pesadas.
- Bordas e contornos em todos os elementos.
- Muitos elementos coloridos competindo pela atenção.
- Textos excessivamente longos.
- Botões com aparência inconsistente.
- Componentes que pareçam ter sido montados sem uma identidade visual definida.

A interface não deve parecer um template pronto com troca de cores.

# 3. Identidade visual

A identidade visual ainda poderá ser refinada durante a construção do produto.

A primeira proposta deverá explorar uma combinação de cores que transmita confiança, mobilidade, acolhimento e profissionalismo.

## 3.1. Direção de cores

Paleta inicial sugerida:

| Uso | Cor | Código |
|---|---|---|
| Cor principal | Azul | `#3478F6` |
| Azul escuro | Azul profundo | `#1F3F75` |
| Cor secundária | Verde | `#38A879` |
| Destaque | Amarelo | `#F5C45E` |
| Fundo principal | Cinza muito claro | `#F7F8FA` |
| Superfícies | Branco | `#FFFFFF` |
| Texto principal | Grafite | `#202938` |
| Texto secundário | Cinza | `#687386` |
| Bordas | Cinza claro | `#E5E9F0` |

Essas cores são uma referência inicial, não uma identidade definitiva.

A aplicação deverá manter equilíbrio visual, utilizando a cor principal para ações importantes e as cores secundárias como apoio.

Não utilizar todas as cores com a mesma intensidade em uma única tela.

## 3.2. Tipografia

Priorizar uma tipografia moderna, legível e com boa visualização em telas pequenas.

Sugestões:

- Inter.
- Manrope.
- Plus Jakarta Sans.

A tipografia deverá possuir hierarquia clara:

- Títulos principais.
- Títulos de seção.
- Subtítulos.
- Texto de apoio.
- Labels.
- Informações auxiliares.

Evitar textos excessivamente pequenos, especialmente em formulários e informações operacionais.

## 3.3. Ilustrações e elementos cartoon

A identidade poderá utilizar ilustrações próprias com:

- Vans.
- Pessoas viajando.
- Motoristas.
- Clientes.
- Rotas.
- Pontos de embarque.
- Localizações.
- Malas e objetos relacionados ao transporte.
- Elementos de conexão entre pessoas.

As ilustrações deverão possuir uma linguagem visual consistente.

Diretrizes:

- Formas simples e amigáveis.
- Poucas cores por ilustração.
- Contornos e proporções consistentes.
- Aparência leve e profissional.
- Evitar excesso de detalhes.
- Não utilizar ilustrações apenas para preencher espaços vazios.

As ilustrações deverão ajudar a comunicar o funcionamento da plataforma.

Exemplo: uma ilustração de uma van conectando dois pontos pode explicar visualmente a proposta do marketplace.

## 3.4. Ícones

Utilizar uma biblioteca consistente de ícones, preferencialmente Lucide.

Os ícones deverão:

- Ter o mesmo estilo visual.
- Possuir tamanho proporcional ao contexto.
- Ser acompanhados de texto quando sua interpretação não for óbvia.
- Evitar substituição de palavras importantes por ícones isolados.

# 4. Arquitetura de informação

A plataforma deverá possuir quatro ambientes principais.

1. Site público.
2. Painel do cliente.
3. Painel do prestador.
4. Painel administrativo.

Cada ambiente deverá possuir navegação adequada às suas funcionalidades.

## 4.1. Site público

Objetivo: apresentar a plataforma, explicar sua proposta e direcionar visitantes para cadastro ou contratação.

Estrutura sugerida:

### Página inicial

**Seção 1 — Hero**

Apresentar a proposta de valor de maneira objetiva.

Exemplo de mensagem:

"Encontre o transporte certo para sua necessidade."

Texto de apoio:

"Conectamos pessoas, empresas e instituições a profissionais e empresas de transporte por vans."

Ações principais:

- Encontrar transporte.
- Oferecer meus serviços.

A composição poderá utilizar uma ilustração de uma van e elementos gráficos de localização ou conexão.

**Seção 2 — Como funciona**

Explicar o funcionamento em três etapas:

1. Informe o que precisa.
2. Encontre opções ou receba propostas.
3. Escolha e contrate.

A explicação deverá ser visual, com textos curtos e ilustrações.

**Seção 3 — Categorias de transporte**

Apresentar as categorias disponíveis na plataforma.

Exemplos:

- Transporte empresarial.
- Transporte para eventos.
- Passeios e excursões.
- Transporte escolar ou institucional, quando habilitado.

Cada categoria deverá possuir uma representação visual própria.

Não apresentar como disponível uma modalidade que ainda não tenha sido validada e liberada.

**Seção 4 — Para quem precisa contratar**

Apresentar vantagens para pessoas, empresas e instituições.

**Seção 5 — Para quem oferece transporte**

Apresentar a oportunidade de encontrar clientes e ampliar as possibilidades de trabalho.

**Seção 6 — Confiança e transparência**

Explicar que a plataforma possui processos de cadastro, análise e validação de prestadores e veículos.

Não utilizar afirmações absolutas como "transporte 100% seguro".

**Seção 7 — Chamada final**

Convidar visitantes a conhecer a plataforma.

**Seção 8 — Rodapé**

Incluir:

- Sobre a plataforma.
- Como funciona.
- Categorias.
- Termos de uso.
- Política de privacidade.
- Contato.
- Acesso à conta.

## 4.2. Painel do cliente

Objetivo: facilitar a criação de solicitações, a busca de prestadores e o acompanhamento das contratações.

Estrutura de navegação sugerida:

- Visão geral.
- Encontrar transporte.
- Minhas solicitações.
- Propostas recebidas.
- Minhas contratações.
- Histórico.
- Perfil e configurações.

### Dashboard do cliente

O dashboard deverá apresentar informações úteis, sem excesso de indicadores.

Elementos sugeridos:

- Saudação.
- Ação principal para solicitar transporte.
- Solicitações em andamento.
- Propostas recebidas.
- Próximos serviços contratados.
- Histórico recente.

Não preencher o dashboard com gráficos sem utilidade real.

O objetivo é ajudar o cliente a entender o que precisa de sua atenção.

### Encontrar transporte

A busca deverá ser simples e objetiva.

Campos iniciais:

- Origem.
- Destino.
- Data.
- Quantidade de passageiros.
- Categoria do transporte.

Quando necessário, o formulário deverá permitir informar:

- Ida e volta.
- Horários.
- Múltiplos pontos de embarque.
- Frequência.
- Necessidades específicas.

O formulário deverá ser dividido em etapas quando a quantidade de informações for grande.

Evitar apresentar todos os campos simultaneamente em uma tela longa.

### Solicitação de orçamento

A tela deverá explicar o que está sendo solicitado.

O cliente deverá visualizar um resumo antes de publicar.

Após o envio, apresentar uma confirmação clara, explicando que os prestadores compatíveis poderão enviar propostas.

### Propostas recebidas

As propostas deverão ser organizadas para facilitar a comparação.

Informações importantes:

- Nome do prestador ou empresa.
- Veículo oferecido.
- Capacidade.
- Valor proposto.
- Condições.
- Disponibilidade.
- Situação de aprovação.
- Avaliações, quando disponíveis.

A comparação deverá destacar as diferenças relevantes sem transformar a tela em uma tabela excessivamente complexa.

### Minhas contratações

Apresentar:

- Serviços confirmados.
- Próximos serviços.
- Serviços em andamento.
- Serviços concluídos.
- Serviços cancelados.

O cliente deverá conseguir abrir cada contratação e consultar seus detalhes.

## 4.3. Painel do prestador

Objetivo: facilitar o gerenciamento de veículos, documentos, oportunidades e serviços.

Estrutura de navegação sugerida:

- Visão geral.
- Solicitações disponíveis.
- Minhas propostas.
- Serviços contratados.
- Veículos.
- Documentos.
- Disponibilidade.
- Regiões de atendimento.
- Financeiro.
- Perfil e configurações.

### Dashboard do prestador

O painel deverá destacar:

- Situação da conta.
- Situação documental.
- Solicitações compatíveis.
- Propostas enviadas.
- Serviços confirmados.
- Próximos compromissos.

Se o prestador ainda não estiver aprovado, a interface deverá explicar claramente o que falta para liberar suas atividades.

### Solicitações disponíveis

Cada solicitação deverá apresentar as informações necessárias para avaliar o serviço:

- Categoria.
- Origem.
- Destino.
- Data e horário.
- Quantidade de passageiros.
- Frequência.
- Pontos de embarque.
- Informações complementares.

O prestador deverá conseguir visualizar os detalhes antes de enviar uma proposta.

### Envio de proposta

O formulário deverá permitir informar:

- Valor.
- Veículo.
- Condições.
- Disponibilidade.
- Observações.

Antes de enviar, apresentar um resumo para confirmação.

### Veículos

O prestador deverá visualizar seus veículos em uma lista organizada.

Cada veículo deverá apresentar:

- Modelo.
- Placa, com exposição restrita conforme o contexto.
- Capacidade.
- Situação.
- Documentação.
- Validade documental.

O status do veículo deverá ser visualmente fácil de compreender.

### Documentos

Criar uma área organizada para acompanhar documentos.

Utilizar estados claros:

- Aprovado.
- Em análise.
- Pendente.
- Reprovado.
- Vencido.

Quando um documento for reprovado, apresentar o motivo e a orientação para correção.

Não exibir informações documentais sensíveis desnecessariamente.

## 4.4. Painel administrativo

Objetivo: fornecer ferramentas de gestão e controle da plataforma.

O painel administrativo poderá possuir uma aparência mais funcional e objetiva, mantendo a mesma identidade visual do produto.

Navegação sugerida:

- Visão geral.
- Usuários.
- Prestadores.
- Veículos.
- Documentos.
- Modalidades.
- Solicitações.
- Propostas.
- Contratações.
- Ocorrências.
- Configurações.

### Dashboard administrativo

Apresentar indicadores como:

- Total de clientes.
- Prestadores cadastrados.
- Prestadores aguardando aprovação.
- Solicitações publicadas.
- Contratações confirmadas.
- Ocorrências pendentes.

Os números deverão ser provenientes de dados reais do sistema.

Não apresentar indicadores fictícios como se fossem resultados da operação.

### Análise de documentos

A tela deverá permitir:

- Visualizar os dados do cadastro.
- Consultar o documento de forma protegida.
- Conferir a validade.
- Aprovar.
- Reprovar.
- Solicitar correção.
- Registrar observações.

A interface deverá facilitar a análise sem expor documentos para usuários não autorizados.

# 5. Design system

O projeto deverá possuir um conjunto de componentes reutilizáveis.

O objetivo é evitar que cada tela seja construída com estilos diferentes.

## 5.1. Componentes básicos

Criar componentes compartilhados para:

- Botões.
- Inputs.
- Textareas.
- Selects.
- Checkboxes.
- Radio buttons.
- Badges de status.
- Cards.
- Modais.
- Tooltips.
- Dropdowns.
- Tabs.
- Breadcrumbs.
- Paginação.
- Tabelas.
- Alertas.
- Toasts.
- Skeleton loading.
- Empty states.

## 5.2. Botões

Definir variações consistentes:

- Primary.
- Secondary.
- Outline.
- Ghost.
- Destructive.

Cada botão deverá possuir estados:

- Normal.
- Hover.
- Focus.
- Disabled.
- Loading.

Não utilizar cores diferentes para botões com a mesma finalidade.

## 5.3. Formulários

Os formulários deverão:

- Possuir labels visíveis.
- Indicar campos obrigatórios.
- Apresentar erros próximos ao campo correspondente.
- Validar dados no frontend e backend.
- Preservar informações quando ocorrer um erro recuperável.
- Apresentar feedback após o envio.
- Ser confortáveis de utilizar em dispositivos móveis.

## 5.4. Status

Os estados deverão ser apresentados de maneira consistente.

Exemplos:

- Aprovado.
- Em análise.
- Pendente.
- Reprovado.
- Confirmado.
- Cancelado.
- Concluído.

Não utilizar apenas cores para indicar o significado do status.

O texto deverá sempre estar presente.

## 5.5. Cards

Cards devem ser utilizados quando ajudarem a agrupar informações relacionadas.

Não transformar cada informação da tela em um card independente.

Priorizar hierarquia, espaçamento e organização visual.

# 6. Acessibilidade

A acessibilidade deverá fazer parte da construção desde o início.

Utilizar WCAG como referência.

Diretrizes:

- Contraste adequado entre texto e fundo.
- Navegação por teclado.
- Estados de foco visíveis.
- Labels associados aos campos.
- Textos alternativos para imagens informativas.
- Semântica HTML adequada.
- Hierarquia correta de títulos.
- Botões com nomes compreensíveis.
- Mensagens de erro acessíveis.
- Não utilizar apenas cores para comunicar estados.
- Respeitar preferências de redução de movimento.
- Evitar animações que prejudiquem a leitura.

A interface deverá ser utilizável por pessoas com diferentes níveis de familiaridade tecnológica.

# 7. Responsividade e experiência mobile-first

A plataforma deverá ser projetada prioritariamente para celulares.

O layout desktop não deverá ser simplesmente reduzido para telas menores.

Cada ambiente deverá ser planejado considerando seu contexto de utilização.

## 7.1. Mobile

Priorizar:

- Navegação simples.
- Botões com áreas de toque confortáveis.
- Formulários divididos em etapas.
- Informações essenciais em primeiro plano.
- Cards compactos.
- Menus fáceis de acessar.
- Textos legíveis.
- Tabelas adaptadas para visualização móvel.

Evitar tabelas com rolagem horizontal quando houver uma alternativa mais clara.

## 7.2. Tablet

A interface deverá aproveitar melhor o espaço disponível, mantendo a hierarquia dos elementos.

## 7.3. Desktop

A interface poderá utilizar:

- Sidebar.
- Conteúdo central.
- Tabelas completas.
- Filtros laterais.
- Visualização ampliada de informações.

A navegação deverá manter consistência entre os tamanhos de tela.

# 8. Experiência do usuário e usabilidade

A experiência deverá reduzir a quantidade de decisões desnecessárias.

## 8.1. Princípio da simplicidade

O usuário não deverá precisar entender o funcionamento interno da plataforma para conseguir contratar um serviço.

Exemplo:

Em vez de utilizar termos técnicos como "publicar uma ordem operacional", utilizar:

"Solicitar transporte".

## 8.2. Prevenção de erros

A interface deverá ajudar a evitar erros antes que aconteçam.

Exemplos:

- Informar quando a quantidade de passageiros ultrapassar a capacidade disponível.
- Alertar sobre campos obrigatórios.
- Impedir envio de formulários incompletos.
- Confirmar ações importantes.
- Informar quando um veículo não estiver disponível.
- Explicar por que uma contratação não pode ser realizada.

## 8.3. Feedback das ações

Toda ação importante deverá possuir retorno visual.

Exemplos:

- Solicitação publicada.
- Proposta enviada.
- Contratação confirmada.
- Documento enviado.
- Documento aprovado.
- Alteração salva.
- Erro ao processar solicitação.

Evitar mensagens genéricas como "Ocorreu um erro" quando for possível explicar o problema.

## 8.4. Empty states

As telas sem dados deverão possuir uma experiência própria.

Exemplos:

**Nenhuma solicitação encontrada**

"Quando você solicitar um transporte, suas solicitações aparecerão aqui."

**Nenhuma proposta recebida**

"Ainda não recebemos propostas para esta solicitação. Você poderá acompanhar por aqui."

**Nenhum veículo cadastrado**

"Cadastre seu primeiro veículo para começar a organizar seus serviços."

Utilizar ilustrações pequenas quando fizer sentido, sem exagerar na decoração.

## 8.5. Loading states

Utilizar:

- Skeletons.
- Indicadores de carregamento.
- Feedback de processamento.
- Estados de botão loading.

Evitar telas completamente vazias durante carregamentos.

## 8.6. Estados de erro

Apresentar mensagens compreensíveis e indicar, quando possível, como resolver o problema.

Não expor mensagens técnicas, stack traces ou detalhes internos do backend.

# 9. Busca e experiência com localização

A busca é uma das funcionalidades centrais do produto.

A experiência deverá ser intuitiva e permitir que o cliente compreenda rapidamente as opções disponíveis.

## 9.1. Origem e destino

Os campos deverão permitir informar endereços de maneira simples.

Quando houver integração com mapas, poderão ser utilizadas sugestões de endereço e localização.

## 9.2. Múltiplos pontos de embarque

A interface deverá permitir adicionar, remover e reorganizar pontos.

Cada ponto deverá ser visualmente identificado.

Exemplo:

1. Primeiro embarque.
2. Segundo embarque.
3. Terceiro embarque.
4. Destino final.

## 9.3. Visualização de rota

Futuramente, a plataforma poderá apresentar um mapa com origem, destino e pontos de parada.

O mapa deverá complementar as informações, não substituir os endereços em texto.

## 9.4. Filtros

Os filtros deverão ser objetivos e relevantes:

- Região.
- Capacidade.
- Categoria.
- Disponibilidade.
- Modalidade habilitada.

Não apresentar filtros que não tenham dados confiáveis para funcionar.

# 10. Arquitetura frontend sugerida

A implementação inicial poderá utilizar:

- React.
- Vite.
- TypeScript.
- React Router.
- CSS modular, Tailwind CSS ou outra solução consistente.
- Lucide para ícones.
- Biblioteca de componentes, caso seja necessário.

A escolha definitiva deverá considerar a organização do projeto e evitar dependências desnecessárias.

## 10.1. Organização de diretórios

Estrutura sugerida:

```text
frontend/
├── public/
│   ├── images/
│   ├── illustrations/
│   └── icons/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── feedback/
│   │   ├── navigation/
│   │   └── illustrations/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── ClientLayout.tsx
│   │   ├── ProviderLayout.tsx
│   │   └── AdminLayout.tsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── client/
│   │   ├── provider/
│   │   └── admin/
│   │
│   ├── features/
│   │   ├── authentication/
│   │   ├── clients/
│   │   ├── providers/
│   │   ├── vehicles/
│   │   ├── documents/
│   │   ├── requests/
│   │   ├── proposals/
│   │   └── bookings/
│   │
│   ├── hooks/
│   ├── services/
│   ├── contexts/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   └── main.tsx
│
└── package.json
```

A estrutura poderá ser ajustada conforme a evolução do projeto.

O objetivo é separar responsabilidades e facilitar manutenção.

## 10.2. Layouts separados

Cada ambiente deverá possuir seu próprio layout.

**PublicLayout**

Responsável pela navegação pública e apresentação da plataforma.

**ClientLayout**

Responsável pela experiência de clientes.

**ProviderLayout**

Responsável pelas ferramentas de prestadores.

**AdminLayout**

Responsável pelas ferramentas administrativas.

Os layouts deverão compartilhar o mesmo design system, mas não precisam possuir a mesma navegação.

## 10.3. Rotas sugeridas

Exemplo de organização:

```text
/
├── /como-funciona
├── /categorias
├── /para-prestadores
├── /login
├── /cadastro
│
├── /cliente
│   ├── /dashboard
│   ├── /buscar
│   ├── /solicitacoes
│   ├── /solicitacoes/nova
│   ├── /propostas
│   ├── /contratacoes
│   └── /perfil
│
├── /prestador
│   ├── /dashboard
│   ├── /solicitacoes
│   ├── /propostas
│   ├── /servicos
│   ├── /veiculos
│   ├── /documentos
│   ├── /disponibilidade
│   └── /perfil
│
└── /admin
    ├── /dashboard
    ├── /usuarios
    ├── /prestadores
    ├── /veiculos
    ├── /documentos
    ├── /solicitacoes
    ├── /contratacoes
    └── /ocorrencias
```

As rotas são uma referência inicial e deverão respeitar os requisitos de autenticação e autorização do README 02.

# 11. Integração com backend

O frontend deverá consumir a API REST do backend.

Diretrizes:

- Separar chamadas HTTP dos componentes visuais.
- Centralizar configurações de API.
- Padronizar tratamento de erros.
- Utilizar tipos para os dados recebidos.
- Não armazenar informações sensíveis desnecessariamente.
- Não confiar em validações feitas somente no frontend.
- Proteger rotas conforme o perfil do usuário.
- Respeitar permissões definidas pelo backend.

Os dados apresentados nas telas deverão vir da API quando a funcionalidade estiver integrada.

Durante o desenvolvimento, poderão ser utilizados dados simulados, desde que estejam identificados como dados de demonstração e não sejam confundidos com informações reais.

# 12. Consistência visual e qualidade

Todas as telas deverão seguir o mesmo padrão de:

- Espaçamento.
- Tipografia.
- Cores.
- Bordas.
- Raios.
- Ícones.
- Botões.
- Formulários.
- Estados.
- Feedback.

Criar tokens de design para centralizar essas definições.

Evitar estilos duplicados e valores visuais arbitrários em cada componente.

A interface deverá parecer um produto único, não um conjunto de páginas independentes.

# 13. Critérios de aceite do frontend

O frontend será considerado visualmente e funcionalmente consistente quando:

## Identidade

- [ ] Existe uma identidade visual reconhecível.
- [ ] As cores são utilizadas de maneira consistente.
- [ ] A tipografia possui hierarquia clara.
- [ ] As ilustrações seguem uma mesma linguagem.
- [ ] A inspiração na Skeelo foi adaptada sem copiar sua identidade.

## Navegação

- [ ] O site público possui navegação clara.
- [ ] Cliente e prestador possuem ambientes diferentes.
- [ ] O painel administrativo possui navegação própria.
- [ ] As rotas respeitam os perfis de acesso.
- [ ] O usuário consegue identificar onde está dentro da plataforma.

## Usabilidade

- [ ] Formulários possuem labels e validações.
- [ ] Ações importantes possuem feedback.
- [ ] Telas sem dados possuem empty states.
- [ ] Carregamentos possuem feedback visual.
- [ ] Erros são apresentados de forma compreensível.
- [ ] As informações mais importantes possuem destaque adequado.

## Responsividade

- [ ] A experiência funciona em celulares.
- [ ] A experiência funciona em tablets.
- [ ] A experiência funciona em computadores.
- [ ] Não existem elementos cortados ou sobrepostos.
- [ ] Os formulários são utilizáveis em telas pequenas.

## Acessibilidade

- [ ] Existe contraste adequado.
- [ ] A navegação por teclado funciona.
- [ ] Os estados de foco são visíveis.
- [ ] Imagens informativas possuem textos alternativos.
- [ ] Campos possuem identificação acessível.
- [ ] A interface não depende exclusivamente de cores para transmitir informações.

# 14. Diretrizes para desenvolvimento com Antigravity

O Antigravity deverá utilizar este documento como referência para implementar a experiência visual e o frontend.

Antes de gerar ou alterar componentes:

1. Ler os três documentos do projeto.
2. Entender os quatro ambientes da plataforma.
3. Definir uma direção visual consistente.
4. Criar os tokens e componentes compartilhados.
5. Planejar a navegação.
6. Implementar primeiro os fluxos principais.
7. Testar responsividade.
8. Verificar acessibilidade.
9. Validar a integração com o backend.
10. Documentar decisões importantes.

## 14.1. Como trabalhar com referências visuais

Quando uma imagem ou site de referência for fornecido:

- Analisar hierarquia visual.
- Observar espaçamentos.
- Identificar padrões de composição.
- Avaliar tipografia.
- Observar o uso de ilustrações.
- Entender como os elementos aparecem durante a navegação.

Não copiar diretamente uma interface.

Adaptar as referências à identidade e às necessidades do marketplace.

## 14.2. Não implementar tudo de uma vez

A construção deverá ocorrer em etapas.

**Etapa 1 — Fundação visual**

- Paleta.
- Tipografia.
- Tokens.
- Botões.
- Inputs.
- Cards.
- Badges.
- Layouts.
- Navegação.

**Etapa 2 — Site público**

- Página inicial.
- Como funciona.
- Categorias.
- Área para prestadores.
- Cadastro e login.

**Etapa 3 — Painel do cliente**

- Dashboard.
- Nova solicitação.
- Histórico.
- Propostas.
- Contratações.

**Etapa 4 — Painel do prestador**

- Dashboard.
- Solicitações.
- Propostas.
- Veículos.
- Documentos.
- Disponibilidade.

**Etapa 5 — Painel administrativo**

- Dashboard.
- Usuários.
- Prestadores.
- Veículos.
- Documentos.
- Solicitações.
- Contratações.

**Etapa 6 — Refinamento**

- Responsividade.
- Acessibilidade.
- Estados de carregamento.
- Empty states.
- Mensagens de erro.
- Microinterações.
- Testes visuais e funcionais.

# 15. Princípios finais de design

A plataforma deverá seguir cinco princípios:

**1. Clareza antes de decoração**

A aparência deve ajudar o usuário a entender o sistema, não competir com as informações.

**2. Confiança sem excesso de formalidade**

O produto deve transmitir profissionalismo sem parecer um sistema corporativo antigo.

**3. Ilustrações com propósito**

Os elementos cartoon devem fortalecer a identidade e explicar funcionalidades, não apenas preencher espaços.

**4. Mobile-first de verdade**

O celular deve ser considerado desde a concepção das telas, não apenas na etapa final de responsividade.

**5. Consistência em toda a experiência**

O cliente, o prestador e o administrador podem possuir necessidades diferentes, mas devem reconhecer que estão utilizando a mesma plataforma.

---

# 16. Visão da experiência desejada

Queremos construir uma plataforma que seja simples de utilizar, agradável de navegar e confiável para realizar contratações.

O cliente deve conseguir encontrar transporte sem enfrentar formulários confusos.

O prestador deve conseguir encontrar oportunidades e organizar seus serviços sem depender de ferramentas externas para cada etapa.

O administrador deve conseguir acompanhar a operação com clareza.

A identidade visual deverá aproximar a tecnologia das pessoas, utilizando uma linguagem amigável, ilustrações próprias e uma experiência organizada.

**A interface não deve ser o centro da plataforma. Ela deve tornar a conexão entre clientes e prestadores mais simples, clara e confiável.**
