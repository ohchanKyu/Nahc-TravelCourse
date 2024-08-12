package com.example.TravelCourseApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.TravelCourseApplication.dto.Member;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    List<Member> findByName(String name);
    boolean existsByEmail(String email);
}
