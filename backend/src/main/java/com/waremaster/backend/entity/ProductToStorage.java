package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductToStorage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	protected Long id;

	@ManyToOne()
	@JoinColumn(name="product_id")
	protected Product product;

	@ManyToOne()
	@JoinColumn(name="storage_id")
	protected Storage storage;

	@Column(name="quantity")
	protected Integer quantity;

	public Long getId() {
		return id;
	}

	public Product getProduct() {
		return product;
	}

	public Storage getStorage() {
		return storage;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public void setStorage(Storage storage) {
		this.storage = storage;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

}
