package com.example.TravelCourseApplication.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class UserReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long placeId;

    private String author;
    @Column(length = 500)
    private String text;
    private int rating;
    private String registerDate;
    private List<String> reviewImage = new ArrayList<>();
}
