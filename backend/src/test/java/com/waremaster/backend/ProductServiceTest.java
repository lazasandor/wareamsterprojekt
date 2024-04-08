package com.waremaster.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.waremaster.backend.entity.Product;
import com.waremaster.backend.repository.ProductRepository;
import com.waremaster.backend.services.ProductService;

class ProductServiceTest {

	@Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    public void testUpdateProduct() {
        // Arrange
        Product productToUpdate = new Product();
        productToUpdate.setId(1L);
        productToUpdate.setName("Updated Product");

        Product productFromDb = new Product();
        productFromDb.setId(1L);
        productFromDb.setName("Existing Product");

        when(productRepository.findById(1L)).thenReturn(Optional.of(productFromDb));

        // Act
        productService.update(productToUpdate);

        // Assert
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(productFromDb);
    }

}
