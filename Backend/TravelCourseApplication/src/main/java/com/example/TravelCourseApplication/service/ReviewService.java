package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.UserReview;
import com.example.TravelCourseApplication.repository.UserReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Slf4j
public class ReviewService {

    @Value("${path.review-image}")
    private String SAVE_PATH;
    private UserReviewRepository userReviewRepository;

    public ReviewService(UserReviewRepository userReviewRepository){
        this.userReviewRepository = userReviewRepository;
    }

    @Transactional
    public UserReview addUserReview(UserReview newReview, MultipartFile[] imageFile) throws IOException {

        List<String> imageFilePathList = new ArrayList<>();
        if (imageFile != null) {
            for (MultipartFile file : imageFile) {
                String fileName = saveReviewImage(file);
                imageFilePathList.add(fileName);
            }
            newReview.setReviewImage(imageFilePathList);
        }
        return userReviewRepository.save(newReview);
    }

    @Transactional
    public UserReview editUserReview(UserReview newReview, MultipartFile[] imageFile) throws IOException{
        Long editId = newReview.getId();
        Optional<UserReview> targetReview = userReviewRepository.findById(editId);

        if (targetReview.isPresent()){
            deleteAllReviewPhotos(editId);
            targetReview.get().setRating(newReview.getRating());
            targetReview.get().setText(newReview.getText());
            targetReview.get().setRegisterDate(newReview.getRegisterDate());

            List<String> imageFilePathList = new ArrayList<>();
            if (imageFile != null) {
                for (MultipartFile file : imageFile) {
                    String fileName = saveReviewImage(file);
                    imageFilePathList.add(fileName);
                }
                targetReview.get().setReviewImage(imageFilePathList);
            }else{
                targetReview.get().setReviewImage(new ArrayList<>());
            }
            return userReviewRepository.save(targetReview.get());
        }else{
            return null;
        }
    }
    private String saveReviewImage(MultipartFile imageFile) throws IOException {


        String originalFileName = imageFile.getOriginalFilename();
        // 파일의 확장자
        String ext = originalFileName.substring(originalFileName.indexOf("."));
        // 서버에 저장될 때 중복된 파일 이름인 경우를 방지하기 위해 UUID에 확장자를 붙여 새로운 파일 이름을 생성
        String newFileName = UUID.randomUUID() + ext;

        String savePath = SAVE_PATH+newFileName;

        File file = new File(savePath);
        imageFile.transferTo(file);
        return newFileName;
    }

    public ByteArrayResource getReviewImageFromStore(String fileName) throws IOException {
        Path imagePath;
        imagePath = Paths.get(SAVE_PATH+fileName);
        byte[] imageData = Files.readAllBytes(imagePath);
        return new ByteArrayResource(imageData);
    }

    @Transactional(readOnly = true)
    public List<UserReview> getAllReviewsByUserId(Long userId){
        return userReviewRepository.findByUserId(userId);
    }

    @Transactional
    public void deleteReviewByUserId(Long id){
        deleteAllReviewPhotos(id);
        userReviewRepository.deleteById(id);
    }

    private void deleteAllReviewPhotos(Long id){
        Optional<UserReview> targetReview = userReviewRepository.findById(id);
        if (targetReview.isPresent()){
            List<String> reviewImageFileNameList = targetReview.get().getReviewImage();
            for (String fileName : reviewImageFileNameList){
                File deleteFile = new File(SAVE_PATH+fileName);
                if (deleteFile.exists()){
                    if (deleteFile.delete()){
                        log.info("Delete Review Image - {}",fileName);
                    }
                }
            }
        }
    }
}
