package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class Storage {

	@Id
	@Column(name="id")
	protected Long id;

	@Column(name="address")
	protected String address;

	@Column(name="county")
	protected String county;

	@Column(name="city")
	protected String city;

	@Column(name="zipcode")
	protected Integer zipcode;

	public Long getId() {
		return id;
	}

	public String getAddress() {
		return address;
	}

	public String getCounty() {
		return county;
	}

	public String getCity() {
		return city;
	}

	public Integer getZipcode() {
		return zipcode;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setZipcode(Integer zipcode) {
		this.zipcode = zipcode;
	}


}
