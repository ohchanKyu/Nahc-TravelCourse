package com.example.TravelCourseApplication.dto;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue
    private Integer id;
    // 제목
    private String title;
    // 감독명
    private String directorName;
    // 줄거리
    @Column(length = 600)
    private String description;
    // 상영시간
    private String runtime;
    // 관람등급
    private String rating;
    // 개봉일
    private String releaseDate;
    // 영화 이미지 URL
    private String imageURL;
    // 누적관객수
    private String totalCount;

    public Movie(String title,String description,String directorName,String runtime,String rating,String releaseDate,String imageURL,String totalCount){
        this.title = title;
        this.description = description;
        this.directorName = directorName;
        this.runtime = runtime;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.imageURL = imageURL;
        this.totalCount = totalCount;
    }

}
