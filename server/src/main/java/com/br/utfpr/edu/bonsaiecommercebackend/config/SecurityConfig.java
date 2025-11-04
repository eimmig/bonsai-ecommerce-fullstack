package com.br.utfpr.edu.bonsaiecommercebackend.config;

import com.br.utfpr.edu.bonsaiecommercebackend.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Optional;

/**
 * Configuração de segurança da aplicação.
 * Define as regras de autenticação, autorização e integração com JWT.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private static final Logger LOGGER = Logger.getLogger(SecurityConfig.class.getName());

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http)) 
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        // Público - Autenticação e Registro
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/user").permitAll()
                        // Público - Produtos e Categorias (GET apenas)
                        .requestMatchers(HttpMethod.GET, "/api/products/**", "/api/categories/**").permitAll()
                        // Tudo mais requer autenticação
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    public static final class JwtAuthFilter extends OncePerRequestFilter {
        private final JwtUtil jwtUtil;
        
        public JwtAuthFilter(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }
        
        @Override
        protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
                throws ServletException, IOException {
            
            Optional.ofNullable(request.getHeader("Authorization"))
                    .filter(header -> header.startsWith("Bearer "))
                    .map(header -> header.substring(7))
                    .ifPresent(this::authenticateUser);
            
            filterChain.doFilter(request, response);
        }
        
        private void authenticateUser(String token) {
            try {
                UUID userId = jwtUtil.extractUserId(token);
                if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null 
                    && jwtUtil.validateToken(token, userId)) {
                    
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userId.toString(), null, Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                LOGGER.log(Level.WARNING, "Falha ao processar token JWT", e);
            }
        }
    }
}
