package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.AddressRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl extends GenericServiceImpl<AddressModel, AddressEntity>
        implements AddressService {
    public AddressServiceImpl(AddressRepository repository, AddressMapper mapper) {
        super(repository, mapper);
    }
}
