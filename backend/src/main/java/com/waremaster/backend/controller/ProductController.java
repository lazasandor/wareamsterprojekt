package com.waremaster.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.Product;
import com.waremaster.backend.repository.ProductRepository;

import lombok.extern.log4j.Log4j;

@RestController
@Log4j
@RequestMapping(value="/api/product", produces="application/json")
public class ProductController {

	@Autowired
	ProductRepository productRepository;

	@GetMapping(path="/find")
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@PostMapping(path="/save")
	public void save(@RequestBody Product product) {
		System.out.println("Save called with product: " + product.toString());
		productRepository.save(product);
	}

}
