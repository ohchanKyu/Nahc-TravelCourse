package com.example.TravelCourseApplication.repository;

import com.example.TravelCourseApplication.dto.Member;
import com.example.TravelCourseApplication.dto.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Integer> {
    Movie findByTitleAndReleaseDate(String title, String releaseDate);
    List<Movie> findAllByOrderByReleaseDateDesc();
}
