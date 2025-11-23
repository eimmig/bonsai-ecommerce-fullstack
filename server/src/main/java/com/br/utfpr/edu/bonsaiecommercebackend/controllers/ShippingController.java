package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/calculate")
    public ResponseEntity<String> calculateShipping(@RequestBody Map<String, String> request) {
        try {
            String url = "https://www.nuvemshop.com.br/simulate/ne-shipping";

            MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
            formData.add("zipCodeOrigin", request.get("zipCodeOrigin"));
            formData.add("zipCodeDestination", request.get("zipCodeDestination"));
            formData.add("width", request.get("width"));
            formData.add("height", request.get("height"));
            formData.add("depth", request.get("depth"));
            formData.add("weight", request.get("weight"));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro ao calcular frete: " + e.getMessage());
        }
    }
}
