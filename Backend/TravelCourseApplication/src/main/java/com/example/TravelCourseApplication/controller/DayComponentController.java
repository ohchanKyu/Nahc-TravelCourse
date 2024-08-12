package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.dto.DayComponent;
import com.example.TravelCourseApplication.dto.DayComponentNote;
import com.example.TravelCourseApplication.dto.DayComponentPlace;
import com.example.TravelCourseApplication.service.DayComponentService;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequestMapping("/api/dayComponent")
@RestController
public class DayComponentController {

    private DayComponentService dayComponentService;

    public DayComponentController(DayComponentService dayComponentService){
        this.dayComponentService = dayComponentService;
    }

    @GetMapping("/getAllDayComponent")
    public ResponseEntity<List<DayComponent>> getAllDayComponents(@RequestParam("travelPlanId") Long travelPlanId){
        return ResponseEntity.ok(dayComponentService.getAllDayComponentByTravelPlan(travelPlanId));
    }
    @GetMapping("/getAllPlaceComponent")
    public ResponseEntity<List<HashMap<String,Object>>> getAllPlaceComponents(@RequestParam("dayComponentPlaceNumberList")
                                                                         List<Integer> dayComponentPlaceNumberList){
        return ResponseEntity.ok(dayComponentService.getDayComponentPlaceById(dayComponentPlaceNumberList));
    }
    @GetMapping("/getAllNoteComponent")
    public ResponseEntity<List<HashMap<String,Object>>> getAllNoteComponents(@RequestParam("dayComponentNoteNumberList")
                                                                         List<Integer> dayComponentNoteNumberList){
        return ResponseEntity.ok(dayComponentService.getDayComponentNoteById(dayComponentNoteNumberList));
    }
    @PostMapping("/fetchDayComponent")
    public ResponseEntity<DayComponent> fetchDayComponentByData(@RequestParam("dayComponentId") Long dayComponentId,
                                                          @RequestBody List<HashMap<String,Object>> fetchData){
        return ResponseEntity.ok(dayComponentService.fetchDataFromDayComponent(dayComponentId,fetchData));
    }

}
