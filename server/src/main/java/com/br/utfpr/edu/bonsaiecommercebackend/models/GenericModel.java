package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public abstract class GenericModel implements Serializable {
    private UUID id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserModel createdBy;
    private UserModel updatedBy;
}