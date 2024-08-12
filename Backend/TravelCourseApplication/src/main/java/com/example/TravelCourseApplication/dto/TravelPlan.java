package com.example.TravelCourseApplication.dto;

import com.example.TravelCourseApplication.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class TravelPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String travelPlaceName;
    @Convert(converter = StringListConverter.class)
    private List<String> travelDate;
    private int totalDayCount;
    private List<Long> dayComponentNumberList = new ArrayList<>();
}
