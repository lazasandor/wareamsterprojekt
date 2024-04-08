package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.Orders;
import com.waremaster.backend.repository.OrderRepository;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping(path="/api/order", produces="application/json")
public class OrderController {

	@Autowired
	OrderRepository orderRepository;

	@PostMapping(path="/save")
	public void save(@RequestBody Orders order) {
		orderRepository.save(order);
	}
	
	@GetMapping(path="/findall")
	Page<Orders> findAll(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size){
		return orderRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}
}
