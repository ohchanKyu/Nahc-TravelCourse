package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.Movie;

import com.example.TravelCourseApplication.repository.MovieRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MovieService {

    private MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @Value("${api.KmDB.local-key}")
    private String KMDB_API_KEY;
    @Value("${api.kmDB.uri}")
    private String KMDB_URI;

    @Value("${api.kobis.local-key}")
    private String KOBIS_API_KEY;

    @Value("${api.kobis.uri}")
    private String KOBIS_URI;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    private List<Movie> getJSONFetch(StringBuffer sb){
        List<Movie> movies = new ArrayList<>();
        List<Movie> currentReleaseMovieList = new ArrayList<>();

        try{
            JSONParser parser = new JSONParser();

            JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
            JSONObject resultObject = (JSONObject) jsonObject.get("boxOfficeResult");
            JSONArray jsonArray = (JSONArray) resultObject.get("dailyBoxOfficeList");

            for (Object object : jsonArray) {
                JSONObject element = (JSONObject) object;
                String title = (String) element.get("movieNm");
                String releaseDate = (String) element.get("openDt");
                String totalCount = (String) element.get("audiAcc");
                Movie movie = movieRepository.findByTitleAndReleaseDate(title,releaseDate);
                if (movie == null){
                    Movie newMovie = insertTable(title,releaseDate,totalCount);
                    if (newMovie == null){
                        List<Movie> currentMovie = movieRepository.findAllByOrderByReleaseDateDesc();
                        for(int i=0;i<10;i++) {
                            currentReleaseMovieList.add(currentMovie.get(i));
                        }
                        return currentReleaseMovieList;
                    }
                    movies.add(newMovie);
                }else{
                    movie.setTotalCount(totalCount);
                    movies.add(movie);
                }
            }
        }catch(Exception e){
            List<Movie> currentMovie = movieRepository.findAllByOrderByReleaseDateDesc();
            for(int i=0;i<10;i++) {
                currentReleaseMovieList.add(currentMovie.get(i));
            }
            return  currentReleaseMovieList;
        }
        return movies;
    }
    private Movie insertTable(String title, String releaseDate,String totalCount){
        StringBuffer sb = new StringBuffer();
        Movie newMovie = null;
        try{
            SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat desiredFormat = new SimpleDateFormat("yyyyMMdd");
            Date date = originalFormat.parse(releaseDate);
            String formattedDate = desiredFormat.format(date);

            String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);

            URL url = new URL(KMDB_URI+"ServiceKey="+KMDB_API_KEY+"&title="+encodedTitle+"&releaseDts="+formattedDate);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type","application/json");
            connection.setDoOutput(true);
            try{
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
                while(br.ready()){
                    sb.append(br.readLine());
                }
            }catch(SocketException e){
                logger.info("Socket Exception -{}",e.toString());
                return null;
            }
        }catch(Exception e){
            logger.info("Error -{}",e.toString());
        }
        try{
            JSONParser parser = new JSONParser();

            JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
            JSONArray dataObject = (JSONArray) jsonObject.get("Data");
            JSONObject resultObject = (JSONObject) dataObject.get(0);

            JSONArray resultArray  = (JSONArray) resultObject.get("Result");

            JSONObject firstResultObject = (JSONObject) resultArray.get(0);
            JSONObject directorsObject = (JSONObject) firstResultObject.get("directors");
            JSONArray directorsArray = (JSONArray) directorsObject.get("director");
            JSONObject directorObject = (JSONObject) directorsArray.get(0);

            String directorName = (String) directorObject.get("directorNm");
            String rating = (String) firstResultObject.get("rating");
            String runtime = (String) firstResultObject.get("runtime");
            String porters = (String) firstResultObject.get("posters");
            String plotArray[] = porters.split("\\|");
            String imageURL = plotArray[0];

            JSONObject plots = (JSONObject) firstResultObject.get("plots");
            JSONArray plot = (JSONArray) plots.get("plot");
            JSONObject koreanPlot = (JSONObject) plot.get(0);
            String description = (String) koreanPlot.get("plotText");
            newMovie = new Movie(title,description,directorName,runtime,rating,releaseDate,imageURL,totalCount);
            movieRepository.save(newMovie);
            logger.info("Append a Movie {} ",title);
        }catch(ParseException e){
            logger.info("Parse Exception -{}",e.toString());
        }
        return newMovie;
    }

    public List<Movie> getMoviesFromAPI(){
        List<Movie> movies = new ArrayList<>();

        StringBuffer sb = new StringBuffer();
        try{

            LocalDate currentDate = LocalDate.now().minusDays(1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            String formattedCurrentDate = currentDate.format(formatter);

            URL url = new URL(KOBIS_URI+"?key="+KOBIS_API_KEY+"&targetDt="+formattedCurrentDate+"&itemPerPage=10");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type","application/json");

            connection.setDoOutput(true);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
            while(br.ready()){
                sb.append(br.readLine());
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        movies = getJSONFetch(sb);
        return movies;
    }
}
