package com.waremaster.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Order {
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="user_id")
	protected Integer user_id;
	
	@Column(name="product_id")
	protected Integer product_id;
	
	@Column(name="order_date")
	protected LocalDateTime order_date;
	
	@Column(name="price")
	protected Integer price;
	
	@Column(name="quantity")
	protected Integer quantity;

	//Getters
	
	public Integer getId() {
		return id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public LocalDateTime getOrder_date() {
		return order_date;
	}

	public Integer getPrice() {
		return price;
	}

	public Integer getQuantity() {
		return quantity;
	}
	
	//Setters

	public void setId(Integer id) {
		this.id = id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public void setOrder_date(LocalDateTime order_date) {
		this.order_date = order_date;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	
	
}
