package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.AddressRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AddressService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.AuthenticationUtil;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.AddressMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressMapper addressMapper;

    @Override
    @Transactional
    public AddressModel createAddress(AddressModel addressModel) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        AddressEntity addressEntity = addressMapper.toEntity(addressModel);
        addressEntity.setUser(user);

        AddressEntity savedEntity = addressRepository.save(addressEntity);
        return addressMapper.toModel(savedEntity);
    }

    @Override
    public AddressModel getAddress(UUID addressId) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        AddressEntity address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        if (address.getUser() == null || !address.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("Você não tem permissão para acessar este endereço");
        }

        return addressMapper.toModel(address);
    }

    @Override
    public Page<AddressModel> getAllAddresses(Pageable pageable) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        Page<AddressEntity> addresses = addressRepository.findByUserId(userId, pageable);
        return addresses.map(addressMapper::toModel);
    }

    @Override
    @Transactional
    public AddressModel updateAddress(UUID addressId, AddressModel addressModel) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        AddressEntity existingAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        if (existingAddress.getUser() == null || !existingAddress.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("Você não tem permissão para atualizar este endereço");
        }

        existingAddress.setStreet(addressModel.getStreet());
        existingAddress.setNumber(addressModel.getNumber());
        existingAddress.setComplement(addressModel.getComplement());
        existingAddress.setZipCode(addressModel.getZipCode());
        existingAddress.setNeighborhood(addressModel.getNeighborhood());
        existingAddress.setCity(addressModel.getCity());
        existingAddress.setState(addressModel.getState());

        AddressEntity savedEntity = addressRepository.save(existingAddress);
        return addressMapper.toModel(savedEntity);
    }

    @Override
    @Transactional
    public void deleteAddress(UUID addressId) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        AddressEntity address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        if (address.getUser() == null || !address.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("Você não tem permissão para deletar este endereço");
        }

        addressRepository.delete(address);
    }
}

