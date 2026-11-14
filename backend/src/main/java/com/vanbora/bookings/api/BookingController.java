package com.vanbora.bookings.api;

import com.vanbora.bookings.api.dto.BookingResponseDTO;
import com.vanbora.bookings.api.dto.ProposalResponseDTO;
import com.vanbora.bookings.api.dto.SubmitProposalDTO;
import com.vanbora.bookings.application.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Contratações & Propostas (Bookings)", description = "Fluxo de propostas, formalização de contratação e bilhete")
@SecurityRequirement(name = "BearerAuth")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/proposals")
    @PreAuthorize("hasRole('PROVIDER')")
    @Operation(summary = "Enviar proposta para solicitação", description = "Motorista parceiro envia proposta de orçamento e condições")
    public ResponseEntity<ProposalResponseDTO> submitProposal(
            @RequestParam UUID providerId,
            @Valid @RequestBody SubmitProposalDTO dto
    ) {
        ProposalResponseDTO response = bookingService.submitProposal(providerId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/requests/{requestId}/proposals")
    @Operation(summary = "Listar propostas da solicitação", description = "Retorna todas as propostas enviadas para uma viagem")
    public ResponseEntity<List<ProposalResponseDTO>> listProposals(@PathVariable UUID requestId) {
        return ResponseEntity.ok(bookingService.listProposalsForRequest(requestId));
    }

    @PostMapping("/proposals/{proposalId}/accept")
    @PreAuthorize("hasRole('CLIENT')")
    @Operation(summary = "Aceitar proposta e formalizar contratação", description = "Cliente aceita uma proposta, cancela as concorrentes e gera o Booking")
    public ResponseEntity<BookingResponseDTO> acceptProposal(
            @RequestParam UUID clientId,
            @PathVariable UUID proposalId
    ) {
        BookingResponseDTO response = bookingService.acceptProposal(clientId, proposalId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bookings/{bookingId}/check-in")
    @PreAuthorize("hasRole('PROVIDER')")
    @Operation(summary = "Check-in do passageiro no embarque", description = "Motorista informa o código fornecido pelo passageiro para confirmar o embarque")
    public ResponseEntity<BookingResponseDTO> checkIn(
            @PathVariable UUID bookingId,
            @RequestParam String code
    ) {
        return ResponseEntity.ok(bookingService.checkIn(bookingId, code));
    }

    @PostMapping("/bookings/{bookingId}/complete")
    @PreAuthorize("hasRole('PROVIDER') or hasRole('CLIENT')")
    @Operation(summary = "Concluir viagem e liberar valor retido (Custódia/Escrow)", description = "Finaliza o trajeto e libera o saldo na conta do motorista")
    public ResponseEntity<BookingResponseDTO> completeTrip(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(bookingService.completeTrip(bookingId));
    }
}
