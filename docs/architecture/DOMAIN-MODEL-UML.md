# VanBora — Modelo de Domínio e Diagramas UML

Este documento consolida a modelagem visual do **VanBora**, servindo como referência para a implementação das entidades, relacionamentos e casos de uso no backend (Java 21 / Spring Boot) e no frontend (TypeScript / React).

---

## 1. Diagrama de Casos de Uso

```mermaid
flowchart LR
    subgraph Atores
        V((Visitante))
        C((Cliente / Grupo))
        P((Prestador / Motorista))
        A((Administrador))
    end

    subgraph "Sistema VanBora"
        UC01([Consultar categorias e serviços])
        UC02([Cadastrar conta])
        UC03([Gerenciar perfil])
        UC04([Cadastrar veículos])
        UC05([Enviar documentos])
        UC06([Criar solicitação de transporte])
        UC07([Consultar oportunidades no radar])
        UC08([Enviar / Aceitar proposta])
        UC09([Comparar propostas])
        UC10([Aceitar proposta e formalizar])
        UC11([Acompanhar contratação])
        UC12([Avaliar serviço concluído])
        UC13([Analisar documentos])
        UC14([Gerenciar usuários e prestadores])
        UC15([Consultar auditoria de operações])
    end

    %% Visitante
    V --> UC01
    V --> UC02

    %% Cliente
    C --> UC03
    C --> UC06
    C --> UC09
    C --> UC10
    C --> UC11
    C --> UC12

    %% Prestador
    P --> UC03
    P --> UC04
    P --> UC05
    P --> UC07
    P --> UC08
    P --> UC11

    %% Administrador
    A --> UC13
    A --> UC14
    A --> UC15

    %% Relacionamentos de Inclusão e Extensão
    UC10 -.->|include| UC11
    UC08 -.->|extend| UC07
    UC04 -.->|include| UC05
```

---

## 2. Diagrama de Classes de Domínio

Representação formal do modelo conceitual (conforme capturas das frentes de dados):

```mermaid
classDiagram
    class User {
        +UUID id
        +String name
        +String email
        +String passwordHash
        +UserStatus status
    }

    class CustomerProfile {
        +UUID id
        +CustomerType type
        +String document
    }

    class ProviderProfile {
        +UUID id
        +String businessName
        +String phone
        +ProviderStatus status
    }

    class Vehicle {
        +UUID id
        +String plate
        +String model
        +Integer capacity
        +VehicleStatus status
    }

    class VehicleDocument {
        +UUID id
        +DocumentType type
        +String fileKey
        +LocalDate expirationDate
        +DocumentStatus status
    }

    class ServiceRequest {
        +UUID id
        +ServiceCategory category
        +LocalDateTime departureAt
        +Integer passengers
        +RequestStatus status
    }

    class TripStop {
        +UUID id
        +String address
        +Decimal latitude
        +Decimal longitude
        +Integer sequence
    }

    class Proposal {
        +UUID id
        +Decimal amount
        +String conditions
        +LocalDateTime expiresAt
        +ProposalStatus status
    }

    class Booking {
        +UUID id
        +LocalDateTime acceptedAt
        +BookingStatus status
    }

    class Review {
        +UUID id
        +Integer rating
        +String comment
    }

    User "1" --> "0..1" CustomerProfile : possui
    User "1" --> "0..1" ProviderProfile : possui

    CustomerProfile "1" --> "*" ServiceRequest : publica
    ServiceRequest "1" --> "*" TripStop : possui paradas
    ServiceRequest "1" --> "*" Proposal : recebe
    
    ProviderProfile "1" --> "*" Vehicle : cadastra
    Vehicle "1" --> "*" VehicleDocument : possui
    
    ProviderProfile "1" --> "*" Proposal : envia
    Vehicle "1" --> "*" Proposal : vincula

    ServiceRequest "1" --> "0..1" Booking : formaliza
    Proposal "1" --> "0..1" Booking : efetiva
    
    Booking "1" --> "0..*" Review : recebe
    Booking "*" --> "1" Vehicle : utiliza
```

---

## 3. Decisões Importantes de Modelagem

1. **Separação entre Identidade e Papéis de Negócio**:
   - `User` contém apenas credenciais e status de acesso (e-mail, hash de senha, status).
   - `CustomerProfile` armazena dados de quem contrata (PF ou PJ, CNPJ/CPF).
   - `ProviderProfile` armazena os dados do prestador/motorista.
   - Isso permite que um mesmo usuário possa ser cliente e motorista sem duplicação de credenciais.

2. **Paradas Flexíveis (`TripStop`)**:
   - A entidade `TripStop` permite múltiplos pontos de embarque ou desembarque com ordem de sequência (`sequence`), latitude e longitude.

3. **Imutabilidade da Contratação (`Booking`)**:
   - Uma vez aceita a proposta, o `Booking` registra o estado imutável da viagem, preservando o valor, o veículo e as condições negociadas, mesmo que o motorista altere dados do perfil posteriormente.

4. **Documentos Vinculados ao Veículo (`VehicleDocument`)**:
   - A documentação de CRLV e vistoria fica associada diretamente a cada van cadastrada, com chave de armazenamento em Object Storage e data de validade para auditoria.
