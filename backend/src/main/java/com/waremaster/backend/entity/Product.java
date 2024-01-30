package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class Product {
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="name")
	protected String name;
	
	@Column(name="description")
	protected String description;
	
	@Column(name="price")
	protected Integer price;
	
	@Column(name="quantity")
	protected Integer quantity;
	
	@Column(name="storage_location_id")
	protected Integer storage_location_id;

	//Getters
	
	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public Integer getPrice() {
		return price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public Integer getStorage_location_id() {
		return storage_location_id;
	}

	//Setters
	
	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setStorage_location_id(Integer storage_location_id) {
		this.storage_location_id = storage_location_id;
	}
	
	
}
