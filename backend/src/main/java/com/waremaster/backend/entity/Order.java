package com.waremaster.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	protected Long id;

	@Column(name="order_date")
	protected LocalDateTime orderDate;

	@Column(name="price")
	protected Integer price;

	@Column(name="quantity")
	protected Integer quantity;

	@Column(name="customer_name")
	protected String customerName;

	@Column(name="customer_address")
	protected String customerAddress;

	@Column(name="customer_phone")
	protected String customerPhone;

	@ManyToOne()
	@JoinColumn(name="storage_id")
	protected Storage storageOrderedFrom;

	public Long getId() {
		return id;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public Integer getPrice() {
		return price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public String getCustomerName() {
		return customerName;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}


}
