package com.example.TravelCourseApplication.service;


import com.example.TravelCourseApplication.dto.DayComponent;
import com.example.TravelCourseApplication.dto.DayComponentPlace;
import com.example.TravelCourseApplication.dto.TravelPlan;
import com.example.TravelCourseApplication.repository.DayComponentNoteRepository;
import com.example.TravelCourseApplication.repository.DayComponentPlaceRepository;
import com.example.TravelCourseApplication.repository.DayComponentRepository;
import com.example.TravelCourseApplication.repository.TravelPlanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TravelPlanService{

    private TravelPlanRepository travelPlanRepository;
    private DayComponentRepository dayComponentRepository;

    private DayComponentPlaceRepository dayComponentPlaceRepository;
    private DayComponentNoteRepository dayComponentNoteRepository;

    public TravelPlanService(TravelPlanRepository travelPlanRepository,DayComponentRepository dayComponentRepository,
                             DayComponentPlaceRepository dayComponentPlaceRepository,DayComponentNoteRepository dayComponentNoteRepository){
        this.travelPlanRepository = travelPlanRepository;
        this.dayComponentRepository = dayComponentRepository;
        this.dayComponentPlaceRepository = dayComponentPlaceRepository;
        this.dayComponentNoteRepository = dayComponentNoteRepository;
    }

    @Transactional(readOnly = true)
    public List<TravelPlan>  getAllTravelPlanByUserId(Long userId){
        return travelPlanRepository.findByUserId(userId);
    }

    @Transactional
    public TravelPlan addTravelPlan(TravelPlan travelPlan){
        for(int i=0;i<travelPlan.getTotalDayCount();i++){
            DayComponent newDayComponent = dayComponentRepository.save(new DayComponent());
            Long newDayComponentId = newDayComponent.getId();
            travelPlan.getDayComponentNumberList().add(newDayComponentId);
        }
        return travelPlanRepository.save(travelPlan);
    }

    @Transactional
    public TravelPlan editTravelPlan(TravelPlan travelPlan){
        Optional<TravelPlan> fetchTravelPlan = travelPlanRepository.findById(travelPlan.getId());
        if (fetchTravelPlan.isPresent()){
            List<Long> dayComponentNumberList = fetchTravelPlan.get().getDayComponentNumberList();
            for (Long deleteId : dayComponentNumberList) {
                Optional<DayComponent> dayComponent = dayComponentRepository.findById(deleteId);
                if (dayComponent.isPresent()) {
                    List<Long> dayComponentPlaceNumberList = dayComponent.get().getDayComponentPlaceNumberList();
                    List<Long> dayComponentNoteNumberList = dayComponent.get().getDayComponentNoteNumberList();
                    for (Long placeId : dayComponentPlaceNumberList) {
                        dayComponentPlaceRepository.deleteById(placeId);
                    }
                    for (Long noteId : dayComponentNoteNumberList) {
                        dayComponentNoteRepository.deleteById(noteId);
                    }
                    dayComponentRepository.deleteById(deleteId);
                }
            }
            fetchTravelPlan.get().getDayComponentNumberList().clear();
            for(int i=0;i<travelPlan.getTotalDayCount();i++){
                DayComponent newDayComponent = dayComponentRepository.save(new DayComponent());
                Long newDayComponentId = newDayComponent.getId();
                fetchTravelPlan.get().getDayComponentNumberList().add(newDayComponentId);
            }
            fetchTravelPlan.get().setTotalDayCount(travelPlan.getTotalDayCount());
            fetchTravelPlan.get().setTravelDate(travelPlan.getTravelDate());
            return travelPlanRepository.save(fetchTravelPlan.get());
        }
        return null;
    }

    @Transactional
    public void deleteTravelPlan(Long travelPlanId){
        List<Long> dayComponentNumberList = travelPlanRepository.findById(travelPlanId).get().getDayComponentNumberList();
        for (Long deleteId : dayComponentNumberList) {
            Optional<DayComponent> dayComponent = dayComponentRepository.findById(deleteId);
            if (dayComponent.isPresent()) {
                List<Long> dayComponentPlaceNumberList = dayComponent.get().getDayComponentPlaceNumberList();
                List<Long> dayComponentNoteNumberList = dayComponent.get().getDayComponentNoteNumberList();
                for (Long placeId : dayComponentPlaceNumberList) {
                    dayComponentPlaceRepository.deleteById(placeId);
                }
                for (Long noteId : dayComponentNoteNumberList) {
                    dayComponentNoteRepository.deleteById(noteId);
                }
                dayComponentRepository.deleteById(deleteId);
            }
        }
        travelPlanRepository.deleteById(travelPlanId);
    }
}
