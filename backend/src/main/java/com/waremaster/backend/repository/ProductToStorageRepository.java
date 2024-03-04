package com.waremaster.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.ProductToStorage;

@Repository
public interface ProductToStorageRepository extends JpaRepository<ProductToStorage, Long>{
	List<ProductToStorage> findAll();
	
	@Query(value="select * from product_to_storage p where p.storage_id = :storageid",
			nativeQuery = true)
	List<ProductToStorage> findByStorageId(@Param("storageid") Long storageid);

	@Query(value="select * from product_to_storage p where "
			+ "p.storage_id = :storageid and p.product_id = :pid", 
			nativeQuery=true)
	ProductToStorage findByStorageAndProductId(@Param("storageid") Long storageId,@Param("pid") Long productId);
}
