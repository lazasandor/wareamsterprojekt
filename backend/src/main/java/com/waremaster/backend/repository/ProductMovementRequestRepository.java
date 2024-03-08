package com.waremaster.backend.repository;

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
}
