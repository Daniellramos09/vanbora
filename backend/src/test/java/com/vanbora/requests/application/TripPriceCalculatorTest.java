package com.vanbora.requests.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("TripPriceCalculator - Regras de Cálculo Justo")
class TripPriceCalculatorTest {

    private final TripPriceCalculator calculator = new TripPriceCalculator();

    @Test
    @DisplayName("Deve garantir valor mínimo (piso de R$ 380) para distâncias ou durações muito curtas")
    void shouldRespectMinimumFloorPrice() {
        // Arrange: 10 km, 2 horas, 15 passageiros, 0 paradas intermediárias
        TripPriceCalculator.RecordEstimate estimate = calculator.calculate(10, 2, 15, 0);

        // Assert: Valor sugerido não pode ser inferior a R$ 380,00
        assertThat(estimate.suggested()).isGreaterThanOrEqualTo(new BigDecimal("380"));
        assertThat(estimate.min()).isNotNull();
        assertThat(estimate.max()).isNotNull();
        assertThat(estimate.pricePerPerson()).isNotNull();
    }

    @ParameterizedTest(name = "Distância {0}km, {1}h, {2} passageiros, {3} paradas deve calcular faixa consistente")
    @CsvSource({
            "80, 8, 15, 0",
            "120, 10, 19, 1",
            "35, 4, 12, 2",
            "45, 3, 15, 0"
    })
    void shouldCalculateRealisticPrices(int distanceKm, int hours, int passengers, int waypoints) {
        TripPriceCalculator.RecordEstimate estimate = calculator.calculate(distanceKm, hours, passengers, waypoints);

        assertThat(estimate.suggested()).isGreaterThan(new BigDecimal("380"));
        assertThat(estimate.min()).isLessThanOrEqualTo(estimate.suggested());
        assertThat(estimate.max()).isGreaterThanOrEqualTo(estimate.suggested());
        assertThat(estimate.pricePerPerson().multiply(BigDecimal.valueOf(passengers)))
                .isBetween(estimate.suggested().subtract(new BigDecimal("20")), estimate.suggested().add(new BigDecimal("20")));
    }
}
