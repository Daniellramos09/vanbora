# VanBora — Estratégia de Testes de Software

Este documento orienta o aprendizado e a aplicação prática de testes de software no **VanBora**, cobrindo testes unitários, testes de integração e validação de regras de negócio.

---

## 1. A Pirâmide de Testes no VanBora

```
            / \
           /   \        E2E (Playwright)
          / E2E \       Valida o fluxo completo: Cliente publica -> Motorista aceita
         /-------\
        /         \     Testes de Integração (Spring Boot Test + Testcontainers)
       / Integração\    Valida transações no PostgreSQL e filtros Spring Security
      /-------------\
     /               \  Testes Unitários (JUnit 5 + Mockito / Vitest)
    /    Unitários    \ Executam em milissegundos; testam regras de negócio puras
   /-------------------\
```

---

## 2. Padrão Universal para Testes Unitários: AAA (Arrange, Act, Assert)

Todo teste unitário no VanBora deve seguir o ritmo de 3 passos:

1. **Arrange (Preparação):** Configura os dados do cenário e ensina os mocks como responder.
2. **Act (Ação):** Executa o método de negócio sendo testado.
3. **Assert (Verificação):** Garante que o resultado esperado aconteceu (ou que uma exceção foi lançada) e que efeitos colaterais foram invocados corretamente.

---

## 3. Cenários Críticos para Estudo e Implementação

### Cenário 1: "Cálculo de Preço Justo de uma Viagem"
* **Regra:** A viagem deve considerar distância estimada, paradas intermediárias e respeitar o piso mínimo operacional da van.
```java
@Test
@DisplayName("Deve calcular o valor sugerido respeitando o piso operacional de van na Grande SP")
void shouldCalculateFairPriceRespectingOperationalFloor() {
    // 1. Arrange
    TripEstimateCalculator calculator = new TripEstimateCalculator();
    int distanceKm = 10; // Viagem muito curta
    int hours = 2;
    int passengers = 15;
    int waypoints = 0;

    // 2. Act
    TripEstimate estimate = calculator.calculate(distanceKm, hours, passengers, waypoints);

    // 3. Assert
    // Mesmo sendo percurso curto, o piso mínimo de deslocamento de van deve ser mantido
    assertThat(estimate.getSuggestedPrice()).isGreaterThanOrEqualTo(new BigDecimal("380.00"));
}
```

### Cenário 2: "Motorista com CNH Vencida Não Pode Aceitar Viagem (RN-001)"
```java
@Test
@DisplayName("Deve lançar exceção ao tentar aceitar corrida com motorista em situação irregular")
void shouldRejectTripAcceptanceWhenDriverCnhIsExpired() {
    // 1. Arrange
    UUID requestId = UUID.randomUUID();
    UUID providerId = UUID.randomUUID();
    
    ProviderProfile provider = ProviderProfileFixture.withExpiredCnh();
    when(providerRepository.findById(providerId)).thenReturn(Optional.of(provider));

    // 2. Act & 3. Assert
    assertThrows(ProviderNotEligibleException.class, () -> {
        acceptTripUseCase.execute(requestId, providerId);
    });

    verify(bookingRepository, never()).save(any());
}
```

### Cenário 3: "Dois Motoristas Aceitam a Mesma Corrida Simultaneamente (Concorrência / Lock)"
* **Tipo:** Teste de Integração com **Testcontainers** e PostgreSQL real.
* **Objetivo:** Simular 2 threads concorrentes tentando fechar a mesma solicitação. Apenas a primeira transação com lock deve ter sucesso; a segunda deve receber erro de concorrência ou status já contratado.

---

## 4. Testes no Frontend (Vitest + React Testing Library)

No frontend, testamos se o componente reage corretamente à interação do usuário sem depender do backend real:

1. Ao selecionar o atalho *"🌿 Sítio no Sábado"*, os campos de endereço e passageiros são populados.
2. O card de cálculo atualiza o valor total e o valor por pessoa em tempo real.
3. Ao enviar o formulário com campos obrigatórios vazios, as mensagens de erro acessíveis são exibidas.
