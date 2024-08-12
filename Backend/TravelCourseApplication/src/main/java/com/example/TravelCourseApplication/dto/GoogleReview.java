package com.example.TravelCourseApplication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoogleReview {

    private String author;
    private String text;
    private int rating;
    private String registerDate;
}
