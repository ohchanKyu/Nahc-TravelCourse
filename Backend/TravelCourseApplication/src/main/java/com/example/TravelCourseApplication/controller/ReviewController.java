package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.dto.UserReview;
import com.example.TravelCourseApplication.service.ReviewService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/review")
@RestController
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping("/addReview")
    public ResponseEntity<UserReview> addOneReview(
            @RequestPart("userReview") UserReview newReview,
            @RequestParam(value = "file", required = false) MultipartFile[] imageFile) throws IOException {
        return ResponseEntity.ok(reviewService.addUserReview(newReview, imageFile));
    }

    @PostMapping("/editReview")
    public ResponseEntity<UserReview> editOneReview( @RequestPart("userReview") UserReview editReview,
                                                     @RequestParam(value = "file", required = false) MultipartFile[] imageFile) throws IOException{
        return ResponseEntity.ok(reviewService.editUserReview(editReview,imageFile));
    }

    @DeleteMapping("/review")
    public ResponseEntity<String> deleteReview(@RequestParam("reviewId") Long id){
        reviewService.deleteReviewByUserId(id);
        return ResponseEntity.ok("Delete Success");
    }
    
    @GetMapping("/getImage")
    public ResponseEntity<ByteArrayResource> getReviewImage(@RequestParam("fileName") String fileName) throws IOException {
        return ResponseEntity.ok(reviewService.getReviewImageFromStore(fileName));
    }

    @GetMapping("/getAllReview")
    public ResponseEntity<List<UserReview>> getAllReviews(@RequestParam("userId") Long userId){
        return ResponseEntity.ok(reviewService.getAllReviewsByUserId(userId));
    }
}
