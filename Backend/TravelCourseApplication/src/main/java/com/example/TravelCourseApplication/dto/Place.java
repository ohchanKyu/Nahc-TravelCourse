package com.example.TravelCourseApplication.dto;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String googlePlaceId;
    private String locationX;
    private String locationY;
    private String placeName;
    private String addressName;
    private String phoneNumber;
    private String placeURL;
    private String placeImage;
}
