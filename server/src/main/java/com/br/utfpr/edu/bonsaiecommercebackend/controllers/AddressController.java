package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller para operações de endereços
 * Service busca userId internamente via AuthenticationUtil
 */
@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final AddressMapper addressMapper;

    /**
     * Cria endereço para o usuário autenticado
     */
    @PostMapping
    public ResponseEntity<AddressOutputDTO> createAddress(@Valid @RequestBody AddressInputDTO dto) {
        AddressModel addressModel = addressMapper.toModel(dto);
        AddressModel createdAddress = addressService.createAddress(addressModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(addressMapper.toOutputDTO(createdAddress));
    }

    /**
     * Lista endereços do usuário autenticado
     */
    @GetMapping
    public ResponseEntity<Page<AddressOutputDTO>> getAddresses(@PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<AddressModel> addresses = addressService.getAllAddresses(pageable);
        return ResponseEntity.ok(addresses.map(addressMapper::toOutputDTO));
    }

    /**
     * Busca endereço específico (valida propriedade)
     */
    @GetMapping("/{id}")
    public ResponseEntity<AddressOutputDTO> getAddress(@PathVariable UUID id) {
        AddressModel address = addressService.getAddress(id);
        return ResponseEntity.ok(addressMapper.toOutputDTO(address));
    }

    /**
     * Atualiza endereço (valida propriedade)
     */
    @PutMapping("/{id}")
    public ResponseEntity<AddressOutputDTO> updateAddress(
            @PathVariable UUID id,
            @Valid @RequestBody AddressInputDTO dto) {
        AddressModel addressModel = addressMapper.toModel(dto);
        AddressModel updatedAddress = addressService.updateAddress(id, addressModel);
        return ResponseEntity.ok(addressMapper.toOutputDTO(updatedAddress));
    }

    /**
     * Deleta endereço (valida propriedade)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable UUID id) {
        addressService.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
}

