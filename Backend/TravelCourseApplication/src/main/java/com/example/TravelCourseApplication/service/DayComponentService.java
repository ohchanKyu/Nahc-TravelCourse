package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.*;
import com.example.TravelCourseApplication.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.ObjectError;

import java.util.*;

@Slf4j
@Service
public class DayComponentService {

    private TravelPlanRepository travelPlanRepository;

    private DayComponentRepository dayComponentRepository;

    private  DayComponentNoteRepository dayComponentNoteRepository;
    private  DayComponentPlaceRepository dayComponentPlaceRepository;

    private PlaceRepository placeRepository;

    public DayComponentService(TravelPlanRepository travelPlanRepository,DayComponentRepository dayComponentRepository
    , DayComponentNoteRepository dayComponentNoteRepository,DayComponentPlaceRepository dayComponentPlaceRepository,PlaceRepository placeRepository){
        this.travelPlanRepository = travelPlanRepository;
        this.dayComponentRepository = dayComponentRepository;
        this.dayComponentNoteRepository = dayComponentNoteRepository;
        this.dayComponentPlaceRepository = dayComponentPlaceRepository;
        this.placeRepository = placeRepository;
    }

    @Transactional(readOnly = true)
    public List<DayComponent> getAllDayComponentByTravelPlan(Long travelPlanId){
        Optional<TravelPlan> travelPlan = travelPlanRepository.findById(travelPlanId);
        if (travelPlan.isPresent()){
            List<DayComponent> dayComponentList = new ArrayList<>();
            List<Long> dayComponentNumberList = travelPlan.get().getDayComponentNumberList();
            for(Long dayComponentId : dayComponentNumberList){
                Optional<DayComponent> dayComponent = dayComponentRepository.findById(dayComponentId);
                dayComponent.ifPresent(dayComponentList::add);
            }
            return dayComponentList;
        }
        return null;
    }

    @Transactional
    public DayComponent fetchDataFromDayComponent(Long dayComponentId,List<HashMap<String,Object>> fetchData){
        Optional<DayComponent> targetDayComponent = dayComponentRepository.findById(dayComponentId);
        if (targetDayComponent.isPresent()){
            List<Long> dayComponentPlaceNumberList =  targetDayComponent.get().getDayComponentPlaceNumberList();
            List<Long> dayComponentNoteNumberList = targetDayComponent.get().getDayComponentNoteNumberList();
            if (!dayComponentPlaceNumberList.isEmpty()){
                for(Long placeNumber : dayComponentPlaceNumberList){
                    dayComponentPlaceRepository.deleteById(placeNumber);
                }
                dayComponentPlaceNumberList.clear();
            }
            if (!dayComponentNoteNumberList.isEmpty()){
                for(Long noteNumber : dayComponentNoteNumberList){
                    dayComponentNoteRepository.deleteById(noteNumber);
                }
                dayComponentNoteNumberList.clear();
            }
            for(HashMap<String,Object> componentMap : fetchData){
                String type = (String) componentMap.get("type");
                if (type.equals("PLACE")){
                    DayComponentPlace newDayComponentPlace = addDayComponentPlace(componentMap);
                    dayComponentPlaceNumberList.add(newDayComponentPlace.getId());
                }else{
                    DayComponentNote newDayComponentNote = addDayComponentNote(componentMap);
                    dayComponentNoteNumberList.add(newDayComponentNote.getId());
                }
            }
            return dayComponentRepository.save(targetDayComponent.get());
        }
        return null;
    }

    @Transactional
    private DayComponentPlace addDayComponentPlace(HashMap<String,Object> placeComponentMap){
        String type = "PLACE";
        String time = null;
        String note = null;
        Long allNumber = (long)((int) placeComponentMap.get("allNumber"));
        long placeNumber = (long)((int) placeComponentMap.get("placeNumber"));

        if (placeComponentMap.containsKey("time")){
            time = (String) placeComponentMap.get("time");
        }
        if (placeComponentMap.containsKey("note")){
            note = (String) placeComponentMap.get("note");
        }
        HashMap<String, Object> dataComponentMap = (HashMap<String,Object>) placeComponentMap.get("data");
        String distance = (String) dataComponentMap.get("distance");
        Long placeId = (long)((int) dataComponentMap.get("id"));

        DayComponentPlace newDayComponentPlace = new DayComponentPlace();

        newDayComponentPlace.setPlaceId(placeId);
        newDayComponentPlace.setType(type);
        newDayComponentPlace.setAllNumber(allNumber);
        newDayComponentPlace.setPlaceNumber(placeNumber);
        newDayComponentPlace.setDistance(distance);
        newDayComponentPlace.setTime(time);
        newDayComponentPlace.setNote(note);
        return dayComponentPlaceRepository.save(newDayComponentPlace);
    }

    @Transactional
    private DayComponentNote addDayComponentNote(HashMap<String,Object> noteComponentMap){
        String type = "NOTE";
        Long allNumber = (long)((int) noteComponentMap.get("allNumber"));
        String time = null;
        if (noteComponentMap.containsKey("time")){
            time = (String) noteComponentMap.get("time");
        }
        HashMap<String, Object> dataComponentMap = (HashMap<String,Object>) noteComponentMap.get("data");
        String text = (String) dataComponentMap.get("text");

        DayComponentNote newDayComponentNote = new DayComponentNote();
        newDayComponentNote.setType(type);
        newDayComponentNote.setAllNumber(allNumber);
        newDayComponentNote.setTime(time);
        newDayComponentNote.setText(text);
        return dayComponentNoteRepository.save(newDayComponentNote);
    }

    @Transactional(readOnly = true)
    public List<HashMap<String,Object>> getDayComponentPlaceById(List<Integer> dayComponentPlaceNumberList){
        List<HashMap<String,Object>> list = new ArrayList<>();
        if (dayComponentPlaceNumberList.isEmpty()){
            return null;
        }
        for(Integer dayComponentPlaceId : dayComponentPlaceNumberList){
            HashMap<String,Object> jsonObject = new HashMap<>();
            Optional<DayComponentPlace> targetPlace = dayComponentPlaceRepository.findById((long) dayComponentPlaceId);
            if (targetPlace.isPresent()){
                String type = targetPlace.get().getType();
                String distance = targetPlace.get().getDistance();
                Long allNumber = targetPlace.get().getAllNumber();
                Long placeNumber = targetPlace.get().getPlaceNumber();
                String time = targetPlace.get().getTime();
                String note = targetPlace.get().getNote();
                jsonObject.put("type",type);
                jsonObject.put("allNumber",allNumber);
                jsonObject.put("placeNumber",placeNumber);
                if (time != null){
                    jsonObject.put("time",time);
                }
                if (note != null){
                    jsonObject.put("note",note);
                }
                Long placeId = targetPlace.get().getPlaceId();
                Optional<Place> place = placeRepository.findById(placeId);
                if (place.isPresent()) {
                    HashMap<String,Object> dataJsonObject = fetchPlaceJsonObject(distance, place.get());
                    jsonObject.put("data", dataJsonObject);
                }
                list.add(jsonObject);
            }
        }
        return list;
    }

    private HashMap<String,Object> fetchPlaceJsonObject(String distance,Place targetPlace){
        HashMap<String,Object> placeObject = new HashMap<>();
        placeObject.put("addressName",targetPlace.getAddressName());
        placeObject.put("id",targetPlace.getId());
        placeObject.put("distance",distance);
        placeObject.put("placeImage",targetPlace.getPlaceImage());
        placeObject.put("locationX",targetPlace.getLocationX());
        placeObject.put("locationY",targetPlace.getLocationY());
        placeObject.put("placeName",targetPlace.getPlaceName());
        placeObject.put("placeURL",targetPlace.getPlaceURL());
        placeObject.put("phoneNumber",targetPlace.getPhoneNumber());
        placeObject.put("googlePlaceId",targetPlace.getGooglePlaceId());
        return placeObject;
    }
    @Transactional(readOnly = true)
    public List<HashMap<String,Object>> getDayComponentNoteById(List<Integer> dayComponentNoteNumberList){
        List<HashMap<String,Object>> list = new ArrayList<>();
        if (dayComponentNoteNumberList.isEmpty()){
            return null;
        }
        for(Integer noteId : dayComponentNoteNumberList){
            HashMap<String,Object> jsonObject = new HashMap<>();
            Optional<DayComponentNote> targetNote = dayComponentNoteRepository.findById((long) noteId);
            if(targetNote.isPresent()){
                String type = targetNote.get().getType();
                Long allNumber = targetNote.get().getAllNumber();
                String time = targetNote.get().getTime();
                String text = targetNote.get().getText();

                if (time != null){
                    jsonObject.put("time",time);
                }
                jsonObject.put("type",type);
                jsonObject.put("allNumber",allNumber);
                HashMap<String, Object> dataJsonObject = new HashMap<>();
                dataJsonObject.put("text",text);
                jsonObject.put("data",dataJsonObject);
            }
            list.add(jsonObject);
        }
        return list;
    }
}
