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
	@JoinColumn(name="from_storage_location_id")
	protected Storage fromStorage;

	@ManyToOne()
	@JoinColumn(name="to_storage_location_id")
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
}
