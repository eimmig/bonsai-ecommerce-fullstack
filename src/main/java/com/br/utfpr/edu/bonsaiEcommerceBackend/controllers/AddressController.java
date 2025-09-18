package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.AddressService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.AddressMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressController extends GenericController<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {

    public AddressController(AddressService service, AddressMapper mapper) {
        super(service, mapper);
    }
}
