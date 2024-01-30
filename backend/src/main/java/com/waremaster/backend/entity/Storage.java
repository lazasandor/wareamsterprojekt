package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class Storage {

	@Id
	@Column(name="location_id")
	protected Integer location_id;
	
	@Column(name="location_name")
	protected String location_name;

	//Getters
	
	public Integer getLocation_id() {
		return location_id;
	}

	public String getLocation_name() {
		return location_name;
	}

	//Setters
	
	public void setLocation_id(Integer location_id) {
		this.location_id = location_id;
	}

	public void setLocation_name(String location_name) {
		this.location_name = location_name;
	}
	
	
}
