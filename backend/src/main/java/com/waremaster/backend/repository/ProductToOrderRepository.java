package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.ProductToOrder;

@Repository
public interface ProductToOrderRepository extends JpaRepository<ProductToOrder, Long>{

}
