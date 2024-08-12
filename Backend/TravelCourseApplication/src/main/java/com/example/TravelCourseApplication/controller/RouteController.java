package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.dto.Location;
import com.example.TravelCourseApplication.service.RouteService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class RouteController {

    private RouteService routeService;
    public RouteController(RouteService routeService){
        this.routeService = routeService;
    }

    @PostMapping("/carRoutes")
    public HashMap<String,Object> getCarRoutes(@RequestBody Location location){
        return routeService.getCarRoutesByLocale(location);
    }

    @PostMapping("/roadRoutes")
    public HashMap<String,Object> getRoadRoutes(@RequestBody Location location){
        return routeService.getRoadRouteByLocale(location);
    }
}
