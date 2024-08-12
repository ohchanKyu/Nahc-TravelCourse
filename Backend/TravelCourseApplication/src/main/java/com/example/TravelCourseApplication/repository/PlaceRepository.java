package com.example.TravelCourseApplication.repository;


import com.example.TravelCourseApplication.dto.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place,Long> {
    Place findByLocationXAndLocationY(String locationX,String locationY);
}
