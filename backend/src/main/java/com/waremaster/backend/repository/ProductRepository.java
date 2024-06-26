package com.waremaster.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.waremaster.backend.dto.ProductDto;
import com.waremaster.backend.entity.Category;
import com.waremaster.backend.entity.Product;
import com.waremaster.backend.entity.ProductToStorage;

import org.springframework.data.jpa.repository.Modifying;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	@Override
	Product save(Product product);

	@Override
	Page<Product> findAll(Pageable pageable);

	Page<Product> findByNameStartsWithIgnoreCase(String name, Pageable pageable);

	Page<Product> findByCategoryId(Long id, Pageable pageable);
	
	@Query(value = "SELECT * FROM product p " +
            "WHERE (:name IS NULL OR p.name LIKE CONCAT(:name, '%')) " +
			"AND (:catid IS NULL OR p.category_id = :catid)" +
            "AND (:id IS NULL OR p.id = :id)",
    nativeQuery = true)
	Page<Product> findProductByParameters(@Param("name") String name, @Param("catid") Long catid,@Param("id") Long id ,Pageable pageable);

	@Query(value="select max(id) from product", nativeQuery = true)
	Long getLastId();

	@Modifying
	@Transactional
	@Query(value="DELETE FROM product_to_storage WHERE product_id = :id", nativeQuery = true)
	void deleteFromConTable(@Param("id") Long id);

	

}
