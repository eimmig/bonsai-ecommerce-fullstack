package com.br.utfpr.edu.bonsaiEcommerceBackend.utils;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.UserModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper extends GenericMapper<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public OrderMapper(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Override
    public OrderModel toModel(OrderInputDTO dto) {
        if (dto == null) return null;

        OrderModel model = modelMapper.map(dto, OrderModel.class);

        if (dto.userId() != null) {
            UserEntity userEntity = userRepository.findById(dto.userId()).orElse(null);
            if (userEntity != null) {
                UserModel userModel = userMapper.toModel(userEntity);
                model.setUserId(userModel);
            }
        }
        return model;
    }
}
