package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.GoogleReview;
import com.example.TravelCourseApplication.dto.UserReview;
import com.example.TravelCourseApplication.repository.UserReviewRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class PlaceDetailService {

    @Value("${api.google.local-key}")
    private String GOOGLE_API_KEY;
    @Value("${api.google.get-place-detail.uri}")
    private String GOOGLE_DETAIL_PLACE_URI;
    @Value("${api.google.search-place.uri}")
    private String GOOGLE_SEARCH_URI;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserReviewRepository userReviewRepository;

    public PlaceDetailService(UserReviewRepository userReviewRepository){
        this.userReviewRepository = userReviewRepository;
    }

    public HashMap<String,Object> getGooglePlaceDetail(String googlePlaceId,Long placeId){

        HashMap<String,Object> detailObject = new HashMap<>();
        if (!googlePlaceId.equals("Not Google Place Id")){
            List<String> weekDayObject = new ArrayList<>();
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

            UriComponents uriComponents = UriComponentsBuilder
                    .fromHttpUrl(GOOGLE_DETAIL_PLACE_URI)
                    .queryParam("key", GOOGLE_API_KEY)
                    .queryParam("place_id", googlePlaceId)
                    .queryParam("language", "ko")
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);
            String body = response.getBody();
            JSONObject json = new JSONObject(body);
            JSONObject resultObject = json.getJSONObject("result");

            String internationalPhoneNumber;
            JSONArray reviewArray;
            JSONObject openingObject;

            try {
                internationalPhoneNumber  = resultObject.getString("international_phone_number");
            }catch (JSONException exception){
                internationalPhoneNumber = null;
            }

            try{
                reviewArray = resultObject.getJSONArray("reviews");
            }catch (JSONException e){
                reviewArray = null;
            }

            try{
                openingObject = resultObject.getJSONObject("current_opening_hours");
            }catch (JSONException e){
                try {
                    openingObject = resultObject.getJSONObject("opening_hours");
                }catch (JSONException exception){
                    openingObject = null;
                }
            }
            if (openingObject != null){
                JSONArray weekDayArray = openingObject.getJSONArray("weekday_text");
                for(int i=0;i<weekDayArray.length();i++){
                    String weekDayText = weekDayArray.getString(i);
                    weekDayObject.add(weekDayText);
                }
                boolean openNow = openingObject.getBoolean("open_now");
                detailObject.put("openNow",openNow);
                detailObject.put("weekDay",weekDayObject);
            }
            if (reviewArray != null){
                detailObject.put("reviews",getAllReviews(reviewArray,placeId));
            }else{
                detailObject.put("reviews",getUserReviews(placeId));
            }
            if (internationalPhoneNumber != null){
                detailObject.put("internationalPhoneNumber",internationalPhoneNumber);
            }
        }else{
            detailObject.put("reviews",getUserReviews(placeId));
        }
        return detailObject;
    }

    private HashMap<String,Object> getUserReviews(Long placeId){

        HashMap<String,Object> reviewMaps = new HashMap<>();

        List<UserReview> userReviewList = userReviewRepository.findByPlaceId(placeId);

        int totalRating = 0;
        int totalCount = userReviewList.size();
        float average;

        if (totalCount == 0){
            return reviewMaps;
        }
        for (UserReview userReview : userReviewList) {
            totalRating += userReview.getRating();
        }
        if (totalRating == 0){
            average = 0;
        }else{
            average = (float) totalRating / (float) totalCount;
        }

        String formatAverage = String.format("%.1f", average);
        reviewMaps.put("UserReview",userReviewList);
        reviewMaps.put("totalRating",formatAverage);
        return reviewMaps;
    }
    private HashMap<String,Object> getAllReviews(JSONArray reviewArray,Long placeId){
        HashMap<String,Object> reviewMaps = new HashMap<>();
        List<GoogleReview> googleReviewList = new ArrayList<>();
        List<UserReview> userReviewList = userReviewRepository.findByPlaceId(placeId);

        int totalRating = 0;
        int totalCount = reviewArray.length() + userReviewList.size();
        float average;

        for (UserReview userReview : userReviewList) {
            totalRating += userReview.getRating();
        }

        for(int i=0;i<reviewArray.length();i++){
            JSONObject googleReviewObject = reviewArray.getJSONObject(i);
            String author = googleReviewObject.getString("author_name");
            int rating = googleReviewObject.getInt("rating");
            String text = googleReviewObject.getString("text");
            String registerDate = googleReviewObject.getString("relative_time_description");
            googleReviewList.add(new GoogleReview(author,text,rating,registerDate));
            totalRating += rating;
        }
        reviewMaps.put("GoogleReview",googleReviewList);
        reviewMaps.put("UserReview",userReviewList);

        if (totalRating == 0){
            average = 0;
        }else if (totalCount == 0){
            return reviewMaps;
        }else{
            average = (float) totalRating / (float) totalCount;
        }
        String formatAverage = String.format("%.1f", average);
        reviewMaps.put("totalRating",formatAverage);
        return reviewMaps;
    }
    public String getGooglePlaceId(String locationX,String locationY,String placeName){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(GOOGLE_SEARCH_URI)
                .queryParam("key", GOOGLE_API_KEY)
                .queryParam("query", placeName)
                .queryParam("radius",500)
                .queryParam("location", locationY + "," + locationX)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);
        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        JSONArray jsonArray = json.getJSONArray("results");
        return fetchFitPlaceId(jsonArray);
    }

    private String fetchFitPlaceId(JSONArray placeArray){
        String placeId = "Not Google Place Id";
        for(int i=0;i<placeArray.length();i++){
            try{
                placeId = placeArray.getJSONObject(i).getString("place_id");
                return placeId;
            }catch(JSONException e){
                logger.info("{} Google Place Data. Not Google Place Id",i);
            }
        }
        return placeId;
    }
}
