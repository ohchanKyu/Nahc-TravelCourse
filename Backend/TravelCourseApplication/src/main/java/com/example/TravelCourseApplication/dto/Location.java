package com.example.TravelCourseApplication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Location {

    private String originX;
    private String originY;
    private String destinationX;
    private String destinationY;
}
