package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.Category;
import com.waremaster.backend.repository.CategoryRepository;

@RestController
@RequestMapping(value="/api/category", produces="application/json")
public class CategoryController {

	@Autowired
	CategoryRepository categoryRepository;
	
	@GetMapping(path="/findbyname/{name}")
	public Category findByName(@PathVariable String name) {
		return categoryRepository.getByCategoryName(name);
	}
}
