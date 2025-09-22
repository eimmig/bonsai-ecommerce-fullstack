package com.br.utfpr.edu.bonsaiecommercebackend.dtos.error;

import java.util.List;

public record ErrorOutputDTO(String message, List<String> details) {}
