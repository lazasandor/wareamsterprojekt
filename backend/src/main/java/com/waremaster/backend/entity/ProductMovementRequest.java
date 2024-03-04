package com.waremaster.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.ToString;

@Entity
@ToString
public class ProductMovementRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	protected Integer id;

	@ManyToOne()
	@JoinColumn(name="from_location_id")
	protected Storage fromStorage;

	@ManyToOne()
	@JoinColumn(name="to_location_id")
	protected Storage toStorage;

	@ManyToOne()
	@JoinColumn(name="user_id")
	protected User userWhoRequested;

	@Column(name="quantity")
	protected Integer quantity;

	@Column(name="movement_date")
	protected LocalDateTime movementDate;

	@Column(name="status")
	protected String status;
	
	@ManyToOne()
	@JoinColumn(name="product_id")
	protected Product product;
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Storage getFromStorage() {
		return fromStorage;
	}

	public void setFromStorage(Storage fromStorage) {
		this.fromStorage = fromStorage;
	}

	public Storage getToStorage() {
		return toStorage;
	}

	public void setToStorage(Storage toStorage) {
		this.toStorage = toStorage;
	}

	public User getUserWhoRequested() {
		return userWhoRequested;
	}

	public void setUserWhoRequested(User userWhoRequested) {
		this.userWhoRequested = userWhoRequested;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public LocalDateTime getMovementDate() {
		return movementDate;
	}

	public void setMovementDate(LocalDateTime movementDate) {
		this.movementDate = movementDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
