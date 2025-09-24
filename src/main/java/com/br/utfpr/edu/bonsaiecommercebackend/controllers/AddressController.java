package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressController extends GenericController<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {

    private final AddressService addressService;

    public AddressController(AddressService service, AddressMapper mapper) {
        super(service, mapper);
        this.addressService = service;
    }

    @Override
    public ResponseEntity<AddressOutputDTO> create(@NonNull AddressInputDTO inputDTO) {
        var model = mapper.toModel(inputDTO);
        var savedModel = addressService.save(model, inputDTO.userId());
        var outputDTO = mapper.toOutputDTO(savedModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDTO);
    }
}
