package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.Storage;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long>{
	
}
