package com.waremaster.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.waremaster.backend.dto.ProductDto;
import com.waremaster.backend.dto.mappers.ProductMapper;
import com.waremaster.backend.entity.Category;
import com.waremaster.backend.entity.Product;
import com.waremaster.backend.repository.CategoryRepository;
import com.waremaster.backend.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	ProductMapper mapper;
	
	public Page<ProductDto> findAll(int page, int size) {
		return productRepository.findAll(PageRequest.of(page, size)).map(mapper::toDto);
	}

	public Page<ProductDto> findByParameters(ProductDto product, int page, int size) {
		
		Long categoryId = ((product.getCategoryName() == null) || (product.getCategoryName().equals(""))) ? null : categoryRepository.getByCategoryName(product.getCategoryName()).getId();
		Long id = (product.getId() == 0L) ? null : product.getId();
		Page<Product> result = productRepository.findProductByParameters(product.getName(), categoryId, id, PageRequest.of(page, size));
		return result != null ? result.map(mapper::toDto) : null;
	}

}
