package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmailAndPassword(String email, String password);

	@Query(value="select id from user where email = :mail and password = :pass", nativeQuery=true)
	Long findId(@Param("mail") String email, @Param("pass") String password);

}
