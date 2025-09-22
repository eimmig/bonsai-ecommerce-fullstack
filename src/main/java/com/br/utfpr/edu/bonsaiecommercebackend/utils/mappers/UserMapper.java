package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.user.UserOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre UserModel, UserEntity, UserInputDTO e UserOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class UserMapper extends GenericMapper<UserModel, UserEntity, UserInputDTO, UserOutputDTO> {
    protected UserMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }

    @Override
    public UserOutputDTO toDTO(UserModel model) {
        return model != null ? UserOutputDTO.fromModel(model) : null;
    }
}
