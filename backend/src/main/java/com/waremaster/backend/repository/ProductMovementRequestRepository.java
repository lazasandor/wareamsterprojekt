package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.ProductMovementRequest;

@Repository
public interface ProductMovementRequestRepository extends JpaRepository<ProductMovementRequest, Long>{

}
