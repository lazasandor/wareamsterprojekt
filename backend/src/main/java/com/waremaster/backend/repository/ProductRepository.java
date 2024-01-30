package com.waremaster.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

	Product save(Product product);
	
	@Query("select p from Product where p.id = ?1")
	Optional<Product> findById(Integer id);
	
	List<Product> findAll();
}
