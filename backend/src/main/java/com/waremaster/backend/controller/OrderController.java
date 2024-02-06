package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.Order;
import com.waremaster.backend.repository.OrderRepository;

import lombok.extern.log4j.Log4j;

@RestController
@Log4j
@RequestMapping(path="/api/order", produces="application/json")
public class OrderController {

	@Autowired
	OrderRepository orderRepository;

	@PostMapping(path="/save")
	public void save(@RequestBody Order order) {
		orderRepository.save(order);
	}
}
