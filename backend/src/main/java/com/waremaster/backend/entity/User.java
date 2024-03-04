package com.waremaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.ToString;

@Entity
@ToString
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	protected Long id;

	@Column(name="name")
	protected String name;

	@Column(name="username")
	protected String username;

	@Column(name="password")
	protected String password;

	@Column(name="email")
	protected String email;

	@Column(name="role")
	protected String role;

//	@OneToMany(mappedBy = "user")
//	List<ProductMovementRequest> productMovementRequests;

	//Getters

	public Long getId() {
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

	public String getRole() {
		return role;
	}

	//Setters

	public void setId(Long id) {
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

	public void setRole(String role) {
		this.role = role;
	}

	public String[] createUserToken(String tkn) {
		String[] token = new String[2];
		token[0] = "" + this.id;
		token[1] = tkn;
		return token;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", username=" + username + ", password=" + password + ", email="
				+ email + ", role=" + role + "]";
	}
	
	

}
