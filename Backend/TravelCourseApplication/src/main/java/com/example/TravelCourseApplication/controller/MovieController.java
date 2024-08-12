package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.dto.Movie;
import com.example.TravelCourseApplication.dto.Place;
import com.example.TravelCourseApplication.service.LocationService;
import com.example.TravelCourseApplication.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class MovieController {

    private MovieService movieService;

    private LocationService locationService;

    public MovieController(MovieService movieService, LocationService locationService){
        this.movieService = movieService;
        this.locationService = locationService;
    }

    @GetMapping("/getAllMovies")
    public List<Movie> getMovies(){
        return  movieService.getMoviesFromAPI();
    };

    @GetMapping("/getCinema")
    public List<Place> getCinemaByLocation(@RequestParam("x") String locationX, @RequestParam("y") String locationY) throws IOException {
        return locationService.getLocationByLocale(locationX,locationY,"영화관");
    }

}
