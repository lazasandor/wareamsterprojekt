package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.Storage;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long>{

	@Query(value="select sum(quantity) from product_to_storage where storage_id = :id", nativeQuery=true)
	int getSumById(@Param("id") int id);
	
}
