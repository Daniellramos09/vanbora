package com.vanbora.requests.application;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class TripPriceCalculator {

    private static final BigDecimal KM_RATE = new BigDecimal("8.50");
    private static final BigDecimal HOUR_RATE = new BigDecimal("45.00");
    private static final BigDecimal WAYPOINT_RATE = new BigDecimal("35.00");
    private static final BigDecimal MINIMUM_FLOOR = new BigDecimal("380.00");

    public RecordEstimate calculate(int distanceKm, int hours, int passengers, int waypointsCount) {
        BigDecimal kmCost = KM_RATE.multiply(BigDecimal.valueOf(distanceKm));
        BigDecimal hourCost = HOUR_RATE.multiply(BigDecimal.valueOf(hours));
        BigDecimal waypointCost = WAYPOINT_RATE.multiply(BigDecimal.valueOf(waypointsCount));

        BigDecimal passengerFactor = passengers > 15 ? new BigDecimal("1.2") : BigDecimal.ONE;

        BigDecimal rawTotal = kmCost.add(hourCost).add(waypointCost).multiply(passengerFactor);
        BigDecimal base = rawTotal.max(MINIMUM_FLOOR);

        // Arredondar para dezena mais próxima (ex: 678 -> 680)
        BigDecimal suggested = base.divide(BigDecimal.TEN, 0, RoundingMode.HALF_UP).multiply(BigDecimal.TEN);

        int safePassengers = Math.max(1, passengers);
        BigDecimal perPerson = suggested.divide(BigDecimal.valueOf(safePassengers), 0, RoundingMode.HALF_UP);

        BigDecimal min = suggested.multiply(new BigDecimal("0.95")).setScale(0, RoundingMode.HALF_UP);
        BigDecimal max = suggested.multiply(new BigDecimal("1.15")).setScale(0, RoundingMode.HALF_UP);

        return new RecordEstimate(min, max, suggested, perPerson, distanceKm, hours);
    }

    public record RecordEstimate(
            BigDecimal min,
            BigDecimal max,
            BigDecimal suggested,
            BigDecimal pricePerPerson,
            int estimatedKm,
            int estimatedHours
    ) {}
}
