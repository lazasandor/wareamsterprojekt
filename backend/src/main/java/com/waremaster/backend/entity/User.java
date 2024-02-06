package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class User {

	@Id
	@Column(name="id")
	protected Integer id;

	@Column(name="name")
	protected String name;

	@Column(name="username")
	protected String username;

	@Column(name="password")
	protected String password;

	@Column(name="email")
	protected String email;

	@Column(name="admin")
	protected Boolean admin;

//	@OneToMany(mappedBy = "user")
//	List<ProductMovementRequest> productMovementRequests;

	//Getters

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	public Boolean getAdmin() {
		return admin;
	}

	//Setters

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public String[] createUserToken(String tkn) {
		String[] token = new String[2];
		token[0] = "" + this.id;
		token[1] = tkn;
		return token;
	}

}
