package com.example.TravelCourseApplication.repository;

import com.example.TravelCourseApplication.dto.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserReviewRepository extends JpaRepository<UserReview,Long> {
    List<UserReview> findByPlaceId(Long PlaceId);
    List<UserReview> findByUserId(Long userId);
}
