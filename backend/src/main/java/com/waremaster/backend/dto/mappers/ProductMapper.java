package com.waremaster.backend.dto.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.waremaster.backend.dto.ProductDto;
import com.waremaster.backend.entity.Product;

@Component
public class ProductMapper {

	@Autowired
	ModelMapper modelMapper;

	public ProductDto toDto(Product product) {
		ProductDto productDto = modelMapper.map(product, ProductDto.class);
        return productDto;
    }

}
