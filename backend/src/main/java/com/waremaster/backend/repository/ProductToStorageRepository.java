package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.ProductToStorage;

@Repository
public interface ProductToStorageRepository extends JpaRepository<ProductToStorage, Long>{

}
