package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.GenericEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.GenericModel;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.DomainMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GenericServiceImplTest {

    @Mock
    private JpaRepository<TestEntity, UUID> repository;

    @Mock
    private DomainMapper<TestModel, TestEntity, Object, Object> mapper;

    private TestGenericService service;

    private UUID testId;
    private TestModel testModel;
    private TestEntity testEntity;

    @BeforeEach
    void setUp() {
        service = new TestGenericService(repository, mapper);
        testId = UUID.randomUUID();

        testModel = new TestModel();
        testModel.setId(testId);
        testModel.setCreatedAt(LocalDateTime.now());

        testEntity = new TestEntity();
        testEntity.setId(testId);
        testEntity.setCreatedAt(LocalDateTime.now());
    }

    @Test
    void save_ShouldSaveAndReturnModel() {
        // Given
        when(mapper.toEntity(testModel)).thenReturn(testEntity);
        when(repository.save(testEntity)).thenReturn(testEntity);
        when(mapper.toModel(testEntity)).thenReturn(testModel);

        // When
        TestModel result = service.save(testModel);

        // Then
        assertNotNull(result);
        assertEquals(testId, result.getId());
        verify(mapper).toEntity(testModel);
        verify(repository).save(testEntity);
        verify(mapper).toModel(testEntity);
    }

    @Test
    void getAll_ShouldReturnAllModels() {
        // Given
        List<TestEntity> entities = Arrays.asList(testEntity);
        List<TestModel> models = Arrays.asList(testModel);

        when(repository.findAll()).thenReturn(entities);
        when(mapper.toModelList(entities)).thenReturn(models);

        // When
        List<TestModel> result = service.getAll();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testId, result.get(0).getId());
        verify(repository).findAll();
        verify(mapper).toModelList(entities);
    }

    @Test
    void getAll_WithEmptyRepository_ShouldReturnEmptyList() {
        // Given
        when(repository.findAll()).thenReturn(Arrays.asList());
        when(mapper.toModelList(anyList())).thenReturn(Arrays.asList());

        // When
        List<TestModel> result = service.getAll();

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(repository).findAll();
        verify(mapper).toModelList(anyList());
    }

    @Test
    void getAllWithPageable_ShouldReturnPagedModels() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        Page<TestEntity> entityPage = new PageImpl<>(Arrays.asList(testEntity), pageable, 1);

        when(repository.findAll(pageable)).thenReturn(entityPage);
        when(mapper.toModel(testEntity)).thenReturn(testModel);

        // When
        Page<TestModel> result = service.getAll(pageable);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(1, result.getContent().size());
        assertEquals(testId, result.getContent().get(0).getId());
        verify(repository).findAll(pageable);
        verify(mapper).toModel(testEntity);
    }

    @Test
    void getById_WithExistingId_ShouldReturnOptionalWithModel() {
        // Given
        when(repository.findById(testId)).thenReturn(Optional.of(testEntity));
        when(mapper.toModel(testEntity)).thenReturn(testModel);

        // When
        Optional<TestModel> result = service.getById(testId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(testId, result.get().getId());
        verify(repository).findById(testId);
        verify(mapper).toModel(testEntity);
    }

    @Test
    void getById_WithNonExistingId_ShouldReturnEmptyOptional() {
        // Given
        when(repository.findById(testId)).thenReturn(Optional.empty());

        // When
        Optional<TestModel> result = service.getById(testId);

        // Then
        assertFalse(result.isPresent());
        verify(repository).findById(testId);
        verify(mapper, never()).toModel(any());
    }

    @Test
    void findByIdOrThrow_WithExistingId_ShouldReturnModel() {
        // Given
        when(repository.findById(testId)).thenReturn(Optional.of(testEntity));
        when(mapper.toModel(testEntity)).thenReturn(testModel);

        // When
        TestModel result = service.findByIdOrThrow(testId);

        // Then
        assertNotNull(result);
        assertEquals(testId, result.getId());
        verify(repository).findById(testId);
        verify(mapper).toModel(testEntity);
    }

    @Test
    void findByIdOrThrow_WithNonExistingId_ShouldThrowResourceNotFoundException() {
        // Given
        when(repository.findById(testId)).thenReturn(Optional.empty());

        // When & Then
        ResourceNotFoundException exception = assertThrows(
            ResourceNotFoundException.class,
            () -> service.findByIdOrThrow(testId)
        );

        assertNotNull(exception.getMessage());
        assertTrue(exception.getMessage().contains("not found with id: " + testId));
        verify(repository).findById(testId);
        verify(mapper, never()).toModel(any());
    }

    @Test
    void delete_WithExistingId_ShouldDeleteSuccessfully() {
        // Given
        when(repository.existsById(testId)).thenReturn(true);

        // When
        assertDoesNotThrow(() -> service.delete(testId));

        // Then
        verify(repository).existsById(testId);
        verify(repository).deleteById(testId);
    }

    @Test
    void delete_WithNonExistingId_ShouldThrowRuntimeException() {
        // Given
        when(repository.existsById(testId)).thenReturn(false);

        // When & Then
        RuntimeException exception = assertThrows(
            RuntimeException.class,
            () -> service.delete(testId)
        );

        assertEquals("Item não encontrado", exception.getMessage());
        verify(repository).existsById(testId);
        verify(repository, never()).deleteById(any());
    }

    @Test
    void update_WithExistingId_ShouldUpdateAndReturnModel() {
        // Given
        TestModel updateModel = new TestModel();
        updateModel.setCreatedAt(LocalDateTime.now());

        when(repository.existsById(testId)).thenReturn(true);
        when(mapper.toEntity(updateModel)).thenReturn(testEntity);
        when(repository.save(testEntity)).thenReturn(testEntity);
        when(mapper.toModel(testEntity)).thenReturn(testModel);

        // When
        TestModel result = service.update(testId, updateModel);

        // Then
        assertNotNull(result);
        assertEquals(testId, result.getId());
        assertEquals(testId, updateModel.getId()); // Verifica se o ID foi setado
        verify(repository).existsById(testId);
        verify(mapper).toEntity(updateModel);
        verify(repository).save(testEntity);
        verify(mapper).toModel(testEntity);
    }

    @Test
    void update_WithNonExistingId_ShouldThrowRuntimeException() {
        // Given
        TestModel updateModel = new TestModel();
        when(repository.existsById(testId)).thenReturn(false);

        // When & Then
        RuntimeException exception = assertThrows(
            RuntimeException.class,
            () -> service.update(testId, updateModel)
        );

        assertEquals("Item não encontrado", exception.getMessage());
        verify(repository).existsById(testId);
        verify(mapper, never()).toEntity(any());
        verify(repository, never()).save(any());
        verify(mapper, never()).toModel(any());
    }

    // Classes de teste internas para simular Model e Entity
    private static class TestModel extends GenericModel {
        // Classe de teste vazia, herda de GenericModel
    }

    private static class TestEntity extends GenericEntity {
        // Classe de teste vazia, herda de GenericEntity
    }

    // Implementação concreta do GenericServiceImpl para testes
    private static class TestGenericService extends GenericServiceImpl<TestModel, TestEntity> {
        protected TestGenericService(JpaRepository<TestEntity, UUID> repository,
                                   DomainMapper<TestModel, TestEntity, ?, ?> mapper) {
            super(repository, mapper);
        }
    }
}
