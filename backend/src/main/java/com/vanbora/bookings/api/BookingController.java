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
}
