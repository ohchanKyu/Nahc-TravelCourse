package com.example.TravelCourseApplication.repository;

import com.example.TravelCourseApplication.dto.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPlanRepository extends JpaRepository<TravelPlan,Long> {
    List<TravelPlan> findByUserId(Long userId);
}
