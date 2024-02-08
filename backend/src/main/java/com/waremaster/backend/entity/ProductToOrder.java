package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductToOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	protected Long id;
	
	@ManyToOne()
	@JoinColumn(name="product_id")
	protected Product product;
	
	@ManyToOne()
	@JoinColumn(name="order_id")
	protected Order order;

	public Long getId() {
		return id;
	}

	public Product getProduct() {
		return product;
	}

	public Order getOrder() {
		return order;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	
}
