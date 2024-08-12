package com.example.TravelCourseApplication.controller;


import com.example.TravelCourseApplication.dto.TravelPlan;
import com.example.TravelCourseApplication.service.TravelPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/travel")
@RestController
public class TravelPlanController {

    private TravelPlanService travelPlanService;

    public TravelPlanController(TravelPlanService travelPlanService){
        this.travelPlanService = travelPlanService;
    }
    @GetMapping("/getAllPlan")
    public ResponseEntity<List<TravelPlan>> getAllTravelPlan(Long userId){
        return ResponseEntity.ok(travelPlanService.getAllTravelPlanByUserId(userId));
    }

    @PostMapping("/addPlan")
    public ResponseEntity<TravelPlan> addTravelPlan(@RequestBody TravelPlan travelPlan){
        return ResponseEntity.ok(travelPlanService.addTravelPlan(travelPlan));
    }

    @PostMapping("/editPlan")
    public ResponseEntity<TravelPlan> editTravelPlan(@RequestBody TravelPlan travelPlan){
        return ResponseEntity.ok(travelPlanService.editTravelPlan(travelPlan));
    }
    @DeleteMapping("/deletePlan")
    public ResponseEntity<String> deleteTravelPlan(@RequestParam("travelPlanId") Long travelPlanId){
        travelPlanService.deleteTravelPlan(travelPlanId);
        return ResponseEntity.ok("Delete Success");
    }
}
