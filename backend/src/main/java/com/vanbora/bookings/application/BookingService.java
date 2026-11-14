package com.vanbora.bookings.application;

import com.vanbora.bookings.api.dto.BookingResponseDTO;
import com.vanbora.bookings.api.dto.ProposalResponseDTO;
import com.vanbora.bookings.api.dto.SubmitProposalDTO;
import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;
import com.vanbora.bookings.domain.Proposal;
import com.vanbora.bookings.domain.ProposalStatus;
import com.vanbora.bookings.infrastructure.BookingRepository;
import com.vanbora.bookings.infrastructure.ProposalRepository;
import com.vanbora.requests.domain.RequestStatus;
import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.requests.infrastructure.ServiceRequestRepository;
import com.vanbora.shared.exception.BusinessRuleException;
import com.vanbora.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final ProposalRepository proposalRepository;
    private final BookingRepository bookingRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    @Transactional
    public ProposalResponseDTO submitProposal(UUID providerId, SubmitProposalDTO dto) {
        ServiceRequest request = serviceRequestRepository.findById(dto.requestId())
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação de viagem não encontrada: " + dto.requestId()));

        if (request.getStatus() != RequestStatus.OPEN) {
            throw new BusinessRuleException("Não é possível enviar propostas para uma solicitação que não está aberta.");
        }

        Proposal proposal = Proposal.builder()
                .requestId(dto.requestId())
                .providerId(providerId)
                .vehicleId(dto.vehicleId())
                .amount(dto.amount())
                .conditions(dto.conditions())
                .expiresAt(dto.expiresAt())
                .status(ProposalStatus.PENDING)
                .build();

        Proposal saved = proposalRepository.save(proposal);
        return ProposalResponseDTO.fromEntity(saved);
    }

    @Transactional
    public BookingResponseDTO acceptProposal(UUID clientId, UUID proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposta não encontrada: " + proposalId));

        ServiceRequest request = serviceRequestRepository.findById(proposal.getRequestId())
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação vinculada não encontrada."));

        if (!request.getCustomerId().equals(clientId)) {
            throw new BusinessRuleException("Apenas o cliente solicitante pode aceitar uma proposta para esta viagem.");
        }

        if (request.getStatus() != RequestStatus.OPEN) {
            throw new BusinessRuleException("Esta solicitação já foi finalizada ou já possui uma proposta aceita.");
        }

        if (proposal.getExpiresAt().isBefore(LocalDateTime.now())) {
            proposal.setStatus(ProposalStatus.EXPIRED);
            proposalRepository.save(proposal);
            throw new BusinessRuleException("A proposta selecionada já expirou.");
        }

        // RN-003: Contratação atômica - marca proposta como aceita e rejeita as demais
        proposal.setStatus(ProposalStatus.ACCEPTED);
        proposalRepository.save(proposal);

        List<Proposal> otherProposals = proposalRepository.findByRequestId(request.getId());
        for (Proposal other : otherProposals) {
            if (!other.getId().equals(proposal.getId()) && other.getStatus() == ProposalStatus.PENDING) {
                other.setStatus(ProposalStatus.REJECTED);
                proposalRepository.save(other);
            }
        }

        // Atualiza status da solicitação
        request.setStatus(RequestStatus.CONTRACTED);
        serviceRequestRepository.save(request);

        // Cria o registro formal de Booking
        Booking booking = Booking.builder()
                .proposal(proposal)
                .acceptedAt(LocalDateTime.now())
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return BookingResponseDTO.fromEntity(savedBooking);
    }

    @Transactional(readOnly = true)
    public List<ProposalResponseDTO> listProposalsForRequest(UUID requestId) {
        return proposalRepository.findByRequestId(requestId)
                .stream()
                .map(ProposalResponseDTO::fromEntity)
                .toList();
    }
}
