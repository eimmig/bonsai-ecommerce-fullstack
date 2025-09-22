package com.br.utfpr.edu.bonsaiecommercebackend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração do bean ModelMapper para mapeamento automático entre DTOs, Models e Entities.
 * Permite injeção do ModelMapper em toda a aplicação.
 */
@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setSkipNullEnabled(true)
                .setAmbiguityIgnored(true);
        return mapper;
    }
}
