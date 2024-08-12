package com.example.TravelCourseApplication.repository;

import com.example.TravelCourseApplication.dto.FavoritePlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritePlaceRepository extends JpaRepository<FavoritePlace,Long> {
    List<FavoritePlace> findByUserId(Long id);
    FavoritePlace  findByUserIdAndPlaceId(Long userId,Long placeId);
}
