package com.example.TravelCourseApplication.controller;


import com.example.TravelCourseApplication.dto.Place;
import com.example.TravelCourseApplication.service.LocationService;
import com.example.TravelCourseApplication.service.PlaceDetailService;
import com.example.TravelCourseApplication.service.PlaceImageService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;

@RestController
public class LocationController {

    private LocationService locationService;
    private PlaceDetailService placeDetailService;

    private PlaceImageService placeImageService;

    public LocationController(LocationService locationService ,PlaceImageService placeImageService,PlaceDetailService placeDetailService){
        this.locationService = locationService;
        this.placeImageService = placeImageService;
        this.placeDetailService = placeDetailService;
    }

    @GetMapping("/getOnePlace")
    public ResponseEntity<Place> getOnePlace(@RequestParam("placeId") Long placeId){
        return ResponseEntity.ok(locationService.getOnePlaceById(placeId));
    }

    @GetMapping("/getLocale")
    public HashMap<String,Object> getLocalLocation(@RequestParam("address") String fullAddress){
        return locationService.getLocaleByAddress(fullAddress);
    }

    @GetMapping("/getImage")
    public ResponseEntity<ByteArrayResource> getLocationImage(@RequestParam("fileName") String fileName) throws IOException {
        HashMap<String,Object> resultMap = placeImageService.getPlaceImage(fileName);

        byte[] imageData = (byte[]) resultMap.get("Image");
        Path path = (Path) resultMap.get("Path");
        ByteArrayResource resource = new ByteArrayResource(imageData);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", Files.probeContentType(path));
        headers.setCacheControl("no-cache");
        return ResponseEntity.ok().headers(headers).contentLength(imageData.length).body(resource);
    }

    @GetMapping("/getPlace")
    public List<Place> getPlaceByLocation(@RequestParam("x") String locationX, @RequestParam("y") String locationY,
        @RequestParam("placeName") String placeName) {
        return locationService.getLocationByLocale(locationX,locationY,placeName);
    }

    @GetMapping("/getRecommendPlace")
    public List<Place> getRecommendPlaceByLocation(@RequestParam("x") String locationX, @RequestParam("y") String locationY) {
        return locationService.getLocationByLocale(locationX, locationY, "가볼만한 곳");
    }

    @GetMapping("/getPlaceDetail")
    public HashMap<String,Object> getPlaceDetailByGooglePlaceId(@RequestParam("googlePlaceId") String googlePlaceId,@RequestParam("placeId") Long placeId){
        return placeDetailService.getGooglePlaceDetail(googlePlaceId,placeId);
    }
}
