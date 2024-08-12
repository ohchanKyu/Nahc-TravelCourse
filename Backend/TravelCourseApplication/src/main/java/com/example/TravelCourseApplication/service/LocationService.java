package com.example.TravelCourseApplication.service;


import com.example.TravelCourseApplication.dto.Place;
import com.example.TravelCourseApplication.repository.PlaceRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Value("${api.kakao.address-to-local.uri}")
    private String ADDRESS_TO_LOCAL_URI;
    @Value("${api.kakao.search-by-keyword.uri}")
    private String SEARCH_LOCATION_BY_KEYWORD_URI;

    @Value("${api.kakao.local-key}")
    private String KAKAO_LOCAL_KEY;

    private PlaceImageService placeImageService;
    private PlaceDetailService placeDetailService;
    private PlaceRepository placeRepository;
    public LocationService(PlaceImageService placeImageService,PlaceRepository placeRepository,PlaceDetailService placeDetailService){
        this.placeImageService = placeImageService;
        this.placeRepository = placeRepository;
        this.placeDetailService = placeDetailService;
    }

    public Place getOnePlaceById(Long id){
        Optional<Place> targetPlace = placeRepository.findById(id);
        return targetPlace.orElse(null);
    }
    public HashMap<String,Object> getLocaleByAddress(String address){
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "KakaoAK " + KAKAO_LOCAL_KEY;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization",apiKey);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(ADDRESS_TO_LOCAL_URI)
                .queryParam("query",address)
                .build();
        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity,String.class);

        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        JSONArray documents = json.getJSONArray("documents");
        String x = documents.getJSONObject(0).getString("x");
        String y = documents.getJSONObject(0).getString("y");

        HashMap<String,Object> locationResult = new HashMap<String,Object>();
        locationResult.put("x",x);
        locationResult.put("y",y);
        return locationResult;
    }

    public List<Place> getLocationByLocale(String locationX,String locationY,String query)  {
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "KakaoAK " + KAKAO_LOCAL_KEY;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization",apiKey);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(SEARCH_LOCATION_BY_KEYWORD_URI)
                .queryParam("query",query)
                .queryParam("x",locationX)
                .queryParam("y",locationY)
                .queryParam("size",9)
                .queryParam("radius",20000)
                .build();
        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity,String.class);

        String body = response.getBody();
        JSONObject json = new JSONObject(body);
        JSONArray documents = json.getJSONArray("documents");

        List<Place> resultList = new ArrayList<>();
        for(Object object : documents){
            JSONObject jsonObject = (JSONObject) object;
            String placeLocationX = jsonObject.getString("x");
            String placeLocationY = jsonObject.getString("y");
            Place searchPlace = placeRepository.findByLocationXAndLocationY(placeLocationX,placeLocationY);

            if (searchPlace != null){
                resultList.add(searchPlace);
            }else {
                String placeName = jsonObject.getString("place_name");
                String placeURL = jsonObject.getString("place_url");
                String addressName = jsonObject.getString("address_name");
                String phoneNumber = jsonObject.getString("phone");

                String googlePlaceId = placeDetailService.getGooglePlaceId(placeLocationX,placeLocationY,placeName);
                String imageFileName = placeImageService.getPlaceImageFileName(placeLocationX, placeLocationY,placeName);

                Place newPlace = new Place();
                newPlace.setGooglePlaceId(googlePlaceId);
                newPlace.setLocationX(placeLocationX);
                newPlace.setLocationY(placeLocationY);
                newPlace.setPlaceName(placeName);
                newPlace.setPlaceURL(placeURL);
                newPlace.setAddressName(addressName);
                newPlace.setPhoneNumber(phoneNumber);

                if (imageFileName.equals("not_select_image")){
                    String baseTypeImageFileName = placeImageService.getPlaceImageFileName(placeLocationX,placeLocationY,query);
                    newPlace.setPlaceImage(baseTypeImageFileName);
                }else{
                    newPlace.setPlaceImage(imageFileName);
                }
                placeRepository.save(newPlace);
                resultList.add(newPlace);
            }
        }
        return resultList;
    }
}


