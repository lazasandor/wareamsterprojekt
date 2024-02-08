package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.ProductToRequest;

@Repository
public interface ProductToRequestRepository extends JpaRepository<ProductToRequest, Long>{

}
