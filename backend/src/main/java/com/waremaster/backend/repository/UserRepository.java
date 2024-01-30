package com.waremaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.waremaster.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
