package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.Location;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;

@Service
public class RouteService {

    @Value("${api.kakao.local-key}")
    private String KAKAO_LOCAL_KEY;
    @Value("${api.kakao.car-route.uri}")
    private String CAR_ROUTE_URI;

    @Value("${api.tmap.local-key}")
    private String TMAP_LOCAL_KEY;

    @Value("${api.tmap.road-route.uri}")
    private String ROAD_ROUTE_URI;

    public HashMap<String,Object> getCarRoutesByLocale(Location location){
        HashMap<String,Object> resultRoutes = new HashMap<>();
        String originX = location.getOriginX();
        String originY = location.getOriginY();
        String destinationX = location.getDestinationX();
        String destinationY = location.getDestinationY();

        String apiKey = "KakaoAK " + KAKAO_LOCAL_KEY;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization",apiKey);
        httpHeaders.set("Content-Type","application/json");
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(CAR_ROUTE_URI)
                .queryParam("origin",originX+","+originY)
                .queryParam("destination",destinationX+","+destinationY)
                .queryParam("waypoints","")
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity,String.class);

        String body = response.getBody();
        JSONObject json = new JSONObject(body);
        try{
            JSONArray routes = json.getJSONArray("routes");
            JSONObject routeObject = (JSONObject) routes.get(0);
            JSONObject summaryObject = (JSONObject) routeObject.getJSONObject("summary");
            String distanceString;
            int distance = summaryObject.getInt("distance");
            if (distance >= 1000){
                distance = Math.round(distance / 1000.f);
                distanceString = distance+"km";
            }else {
                distanceString = distance + "m";
            }
            int duration = Math.round(summaryObject.getInt("duration") / 60.0f);
            int taxiFare = summaryObject.getJSONObject("fare").getInt("taxi");
            resultRoutes.put("distance",distanceString);
            resultRoutes.put("duration",duration);
            resultRoutes.put("taxiFare",taxiFare);
        }catch(JSONException e) {
            return null;
        }
        return resultRoutes;
    }

    public HashMap<String,Object> getRoadRouteByLocale(Location location){
        HashMap<String,Object> resultRoutes = new HashMap<>();
        String originX = location.getOriginX();
        String originY = location.getOriginY();
        String destinationX = location.getDestinationX();
        String destinationY = location.getDestinationY();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("appKey",TMAP_LOCAL_KEY);
        httpHeaders.set("Content-Type","application/json");
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(ROAD_ROUTE_URI)
                .queryParam("startX",originX)
                .queryParam("startY",originY)
                .queryParam("endX",destinationX)
                .queryParam("endY",destinationY)
                .queryParam("startName", "startLocation")
                .queryParam("endName","endLocation")
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity,String.class);

        String body = response.getBody();
        try{
            JSONObject json = new JSONObject(body);
            JSONArray jsonArray = json.getJSONArray("features");
            JSONObject propertiesObject = jsonArray.getJSONObject(0);
            int totalTime = propertiesObject.getJSONObject("properties").getInt("totalTime");
            totalTime = Math.round(totalTime / 60.0f);
            resultRoutes.put("totalTime",totalTime);
        }catch(JSONException e) {
            return null;
        }
        return resultRoutes;
    }
}
