package com.waremaster.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.waremaster.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	@Query(value="select * from category c where c.category LIKE :name", nativeQuery = true)
	Category getByCategoryName(@Param("name") String name);
	
}
