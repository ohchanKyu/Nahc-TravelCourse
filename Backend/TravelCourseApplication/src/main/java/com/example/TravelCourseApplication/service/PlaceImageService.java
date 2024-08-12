package com.example.TravelCourseApplication.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Objects;

@Service
public class PlaceImageService {

    @Value("${api.google.local-key}")
    private String GOOGLE_API_KEY;
    @Value("${api.google.get-place-photo.uri}")
    private String GOOGLE_IMAGE_URI;
    @Value("${api.google.search-place.uri}")
    private String GOOGLE_SEARCH_URI;

    @Value("${path.place-image}")
    private String FILE_PATH;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public HashMap<String,Object> getPlaceImage(String imageFileName) throws IOException {
        HashMap<String,Object> resultMap = new HashMap<>();
        Path imagePath;
        imagePath = Paths.get(FILE_PATH+imageFileName+".jpg");
        resultMap.put("Path",imagePath);

        byte[] imageData = Files.readAllBytes(imagePath);
        resultMap.put("Image",imageData);
        return resultMap;
    }

    private String storeImageFile(byte[] imageData,String placeName){

        String formatFileName = placeName + "_"+ RandomStringUtils.randomAlphanumeric(7);
        try {
            String savePath = FILE_PATH+formatFileName+".jpg";
            File file = new File(savePath);
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(imageData);
            fileOutputStream.close();
            logger.info("Save Place Image. fileName-{}",formatFileName);
        } catch (FileNotFoundException e) {
            logger.info("Not Found File {}",e.toString());
        } catch (IOException e) {
            logger.info("IO Exception! {}",e.toString());
        }
        return formatFileName;
    }

    public String getPlaceImageFileName(String locationX,String locationY,String placeName) {

        String photoReference = getPhotoReferences(locationX,locationY,placeName);
        String imageFileName = "not_select_image";

        if (photoReference.equals("Not Image")){
            return imageFileName;
        }else{
            byte[] imageData = getPhotoImageFromGoogle(photoReference);
            if (imageData != null && imageData.length > 0) {
                imageFileName = storeImageFile(imageData,placeName);
                return imageFileName;
            }
        }
        return imageFileName;
    }

    private String getPhotoReferences(String locationX,String locationY,String placeName){
        RestTemplate restTemplate = new RestTemplate();
        String photoReference;

        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(GOOGLE_SEARCH_URI)
                .queryParam("key", GOOGLE_API_KEY)
                .queryParam("query", placeName)
                .queryParam("radius",10000)
                .queryParam("location", locationY + "," + locationX)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);
        String body = response.getBody();
        JSONObject json = new JSONObject(body);

        JSONArray jsonArray = json.getJSONArray("results");
        photoReference = getBestPhotoReference(jsonArray);
        return photoReference;
    }

    private String getBestPhotoReference(JSONArray photoArray){
        String fitPhotoReference = "Not Image";

        double defaultRatio = 1.0;
        for(int i=0;i<photoArray.length();i++){
            try{
                JSONArray photos = photoArray.getJSONObject(i).getJSONArray("photos");
                JSONObject photo = photos.getJSONObject(0);
                String photoReference = photo.getString("photo_reference");

                int width = photo.getInt("width");
                int height = photo.getInt("height");
                double ratio = (double) width / height;

                if (ratio >= defaultRatio){
                    defaultRatio = ratio;
                    fitPhotoReference = photoReference;
                    return fitPhotoReference;
                }
            }catch(JSONException e){
                logger.info("{} Photo_Data. Not Photo_Reference",i);
            }
        }
        return fitPhotoReference;
    }

    private byte[] getPhotoImageFromGoogle(String photoReference) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        UriComponents imageUriComponents = UriComponentsBuilder
                .fromHttpUrl(GOOGLE_IMAGE_URI)
                .queryParam("key", GOOGLE_API_KEY)
                .queryParam("photo_reference", photoReference)
                .queryParam("maxwidth","300")
                .build();

        ResponseEntity<byte[]> imageResponse = restTemplate.exchange(imageUriComponents.toString(), HttpMethod.GET, entity, byte[].class);
        return imageResponse.getBody();
    }
}
