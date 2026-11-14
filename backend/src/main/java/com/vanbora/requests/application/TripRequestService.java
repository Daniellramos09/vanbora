package com.vanbora.requests.application;

import com.vanbora.identity.domain.User;
import com.vanbora.identity.infrastructure.UserRepository;
import com.vanbora.requests.api.dto.CreateTripRequestDTO;
import com.vanbora.requests.api.dto.TripRequestResponseDTO;
import com.vanbora.requests.domain.RequestStatus;
import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.requests.domain.TripStop;
import com.vanbora.requests.infrastructure.ServiceRequestRepository;
import com.vanbora.requests.infrastructure.TripStopRepository;
import com.vanbora.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@Service
public class TripRequestService {

    private final ServiceRequestRepository requestRepository;
    private final TripStopRepository tripStopRepository;
    private final UserRepository userRepository;
    private final TripPriceCalculator priceCalculator;

    public TripRequestService(
            ServiceRequestRepository requestRepository,
            TripStopRepository tripStopRepository,
            UserRepository userRepository,
            TripPriceCalculator priceCalculator) {
        this.requestRepository = requestRepository;
        this.tripStopRepository = tripStopRepository;
        this.userRepository = userRepository;
        this.priceCalculator = priceCalculator;
    }

    @Transactional
    public TripRequestResponseDTO createRequest(UUID customerId, CreateTripRequestDTO dto) {
        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário cliente não encontrado"));

        int waypointsCount = dto.waypoints() != null ? dto.waypoints().size() : 0;
        boolean hasReturn = dto.returnAt() != null;
        int distanceKm = (hasReturn ? 75 : 40) + waypointsCount * 10;
        int hours = hasReturn ? 8 : 3;

        var estimate = priceCalculator.calculate(distanceKm, hours, dto.passengers(), waypointsCount);

        String title = (dto.title() != null && !dto.title().isBlank())
                ? dto.title()
                : "Viagem de " + dto.origin().split("-")[0].trim() + " para " + dto.destination().split("-")[0].trim();

        ServiceRequest request = new ServiceRequest(
                user.getId(),
                user.getName(),
                title,
                dto.category(),
                dto.origin(),
                dto.destination(),
                dto.departureAt(),
                dto.returnAt(),
                dto.passengers(),
                estimate.suggested(),
                dto.additionalDetails()
        );

        ServiceRequest saved = requestRepository.save(request);

        if (dto.waypoints() != null && !dto.waypoints().isEmpty()) {
            IntStream.range(0, dto.waypoints().size()).forEach(i -> {
                var wpDTO = dto.waypoints().get(i);
                TripStop stop = new TripStop(saved.getId(), wpDTO.address(), wpDTO.passengersCount(), i + 1);
                tripStopRepository.save(stop);
            });
        }

        return toDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<TripRequestResponseDTO> getOpenRadarRequests() {
        return requestRepository.findByStatusOrderByCreatedAtDesc(RequestStatus.OPEN)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TripRequestResponseDTO> getCustomerRequests(UUID customerId) {
        return requestRepository.findByCustomerIdOrderByCreatedAtDesc(customerId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    private TripRequestResponseDTO toDTO(ServiceRequest req) {
        List<TripStop> stops = tripStopRepository.findByRequestIdOrderBySequenceOrderAsc(req.getId());
        List<TripRequestResponseDTO.WaypointResponseDTO> stopDTOs = stops.stream()
                .map(s -> new TripRequestResponseDTO.WaypointResponseDTO(s.getId(), s.getAddress(), s.getPassengersCount(), s.getSequenceOrder()))
                .toList();

        return new TripRequestResponseDTO(
                req.getId(),
                req.getCustomerId(),
                req.getCustomerName(),
                req.getTitle(),
                req.getCategory(),
                req.getOrigin(),
                req.getDestination(),
                req.getDepartureAt(),
                req.getReturnAt(),
                req.getPassengers(),
                req.getEstimatedPrice(),
                req.getStatus(),
                req.getAdditionalDetails(),
                stopDTOs,
                req.getCreatedAt()
        );
    }
}
