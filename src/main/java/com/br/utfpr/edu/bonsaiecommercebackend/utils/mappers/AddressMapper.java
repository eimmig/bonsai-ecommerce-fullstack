package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre AddressModel, AddressEntity, AddressInputDTO e AddressOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class AddressMapper extends GenericMapper<AddressModel, AddressEntity, AddressInputDTO, AddressOutputDTO> {
    protected AddressMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }
}