package com.br.utfpr.edu.bonsaiecommercebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class BonsaiEcommerceBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BonsaiEcommerceBackendApplication.class, args);
    }
}
