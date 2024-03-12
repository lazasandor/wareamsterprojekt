package com.waremaster.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.waremaster.backend.entity.ProductMovementRequest;

@Repository
public interface ProductMovementRequestRepository extends JpaRepository<ProductMovementRequest, Long>{

	@Modifying
	@Transactional
	@Query(value="UPDATE product_to_storage " +
            	 "SET quantity = quantity - :quantity " +
            	 "WHERE storage_id = :fromid AND product_id = :pid",
			nativeQuery=true)
	void decreaseQuantity(@Param("fromid") Long fromId,@Param("pid")  Long productId, 
						  @Param("quantity")  Integer quantity);
	@Modifying
	@Transactional
	@Query(value="UPDATE product_to_storage " +
            	 "SET quantity = quantity + :quantity " +
                 "WHERE storage_id = :toid AND product_id = :pid",
			nativeQuery=true)
	void increaseQuantity(@Param("toid") Long fromId,@Param("pid")  Long productId, 
						  @Param("quantity")  Integer quantity);
	
	@Modifying
	@Transactional
	@Query(value="UPDATE product_movement_request SET status = 'Done' WHERE id = :id", nativeQuery = true)
	void setStatusDone(@Param("id") Integer id);
	
	@Modifying
	@Transactional
	@Query(value="UPDATE product_movement_request SET status = 'Cancelled' WHERE id = :id", nativeQuery = true)
	void setStatusCancel(@Param("id") Integer id);
	
	@Query(value="select * from product_movement_request where user_id = :id", nativeQuery=true)
	Page<ProductMovementRequest> findAllForUser(Pageable pageable, @Param("id") Long id);
	
	@Query(value="select * from product_movement_request where user_id = :id", nativeQuery=true)
	List<ProductMovementRequest> findAllByUserid(Long id);
	
	
}
