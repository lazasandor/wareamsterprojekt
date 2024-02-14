package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.dto.ProductDto;
import com.waremaster.backend.dto.mappers.ProductMapper;
import com.waremaster.backend.entity.Product;
import com.waremaster.backend.repository.ProductRepository;
import com.waremaster.backend.services.ProductService;

import lombok.extern.log4j.Log4j;

@RestController
@Log4j
@RequestMapping(value="/api/product", produces="application/json")
public class ProductController {

	@Autowired
	ProductMapper mapper;

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ProductService productService;

	@GetMapping(path="/find")
	public Page<ProductDto> findAll(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
		
		Page<ProductDto> result = productService.findAll(page, size);
		return result;
	}
	
	@PostMapping(path="/findbyparameter")
	public Page<ProductDto> findByParameters(@RequestBody ProductDto product, @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size){
		
		Page<ProductDto> result = productService.findByParameters(product, page, size);
		return result;
	}

	@PostMapping(path="/save")
	public void save(@RequestBody Product product) {
		System.out.println("Save called with product: " + product.toString());
		productRepository.save(product);
	}

	@PostMapping(path="/delete/{id}")
	public void delete(@PathVariable Long id) {
		System.out.println("Delete called with id: " + id);
		productRepository.deleteById(id);
	}
}
