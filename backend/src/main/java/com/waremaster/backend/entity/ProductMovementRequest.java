package com.waremaster.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.ToString;

@Entity
@ToString
public class ProductMovementRequest {
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="product_id")
	protected Integer product_id;
	
	@Column(name="from_storage_location_id")
	protected Integer from_storage_location_id;
	
	@Column(name="to_storage_location_id")
	protected Integer to_storage_location_id;
	
	@Column(name="user_id")
	protected Integer user_id;
	
	@Column(name="quantity")
	protected Integer quantity;
	
	@Column(name="movement_date")
	protected LocalDateTime movement_date;
	
	@Column(name="status")
	protected String status;
	
	@ManyToOne()
	@JoinColumn(name = "user_id", nullable = false)
	User user;
	
	//Getters
	
	public Integer getId() {
		return id;
	}
	public Integer getProduct_id() {
		return product_id;
	}
	public Integer getFrom_storage_location_id() {
		return from_storage_location_id;
	}
	public Integer getTo_storage_location_id() {
		return to_storage_location_id;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public LocalDateTime getMovement_date() {
		return movement_date;
	}
	
	public String getStatus() {
		return status;
	}
	
	//Setters
	
	public void setId(Integer id) {
		this.id = id;
	}
	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}
	public void setFrom_storage_location_id(Integer from_storage_location_id) {
		this.from_storage_location_id = from_storage_location_id;
	}
	public void setTo_storage_location_id(Integer to_storage_location_id) {
		this.to_storage_location_id = to_storage_location_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public void setMovement_date(LocalDateTime movement_date) {
		this.movement_date = movement_date;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
