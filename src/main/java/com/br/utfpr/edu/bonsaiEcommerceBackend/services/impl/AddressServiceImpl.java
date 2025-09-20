package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.AddressRepository;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.AddressService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.AddressMapper;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl extends GenericServiceImpl<AddressModel, AddressEntity>
        implements AddressService {
    public AddressServiceImpl(AddressRepository repository, AddressMapper mapper) {
        super(repository, mapper);
    }
}
