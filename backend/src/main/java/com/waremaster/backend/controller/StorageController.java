package com.waremaster.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.Storage;
import com.waremaster.backend.repository.StorageRepository;
import com.waremaster.backend.services.StorageService;

@RestController
@RequestMapping(value="api/storage", produces="application/json")
public class StorageController {

	@Autowired
	StorageRepository storageRepository;
	
	@Autowired
	StorageService storageService;
	
	@GetMapping(value="/findall")
	public List<Storage> findAll(){
		return storageRepository.findAll();
	}
	
	@GetMapping(value="/findbyid/{id}")
	public Storage findById(@PathVariable Long id) {
		System.out.println("getbyid called with id: " + id);
		return storageRepository.findById(id).get();
	}
	
	@GetMapping(value="/getsums")
	public int[] getSums() {
		return storageService.getSums();
	}
}
