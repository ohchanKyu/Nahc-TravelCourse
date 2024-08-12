package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.*;
import com.example.TravelCourseApplication.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
// get Member Information
public class UserService {

    private final UserRepository userRepository;
    private final FavoritePlaceRepository favoritePlaceRepository;
    private final TravelPlanService travelPlanService;
    private final TravelPlanRepository travelPlanRepository;
    private final UserReviewRepository userReviewRepository;
    private final PlaceRepository placeRepository;
    private final PasswordEncoder passwordEncoder;
    public Optional<Member> findMemberInfoById(Long memberId){
        return userRepository.findById(memberId);
    }
    public Optional<Member> findMemberInfoByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public List<String> getEmailsByUserName(String name){
        List<Member> memberList = userRepository.findByName(name);
        List<String> emailList = new ArrayList<>();
        if (memberList.isEmpty()){
            return null;
        }else{
            for(Member member : memberList){
                emailList.add(member.getEmail());
            }
            return emailList;
        }
    }
    public Member getUserByEmail(String email){
        Optional<Member> member = userRepository.findByEmail(email);
        return member.orElse(null);
    }

    public boolean checkUserPassword(String email,String password){
        Optional<Member> member = userRepository.findByEmail(email);
        if (member.isPresent()){
            String currentUserPassword = member.get().getPassword();
            return passwordEncoder.matches(password,currentUserPassword);
        }else{
            return false;
        }
    }

    @Transactional
    public Member editUserPassword(String email,String newPassword){
        Optional<Member> member = userRepository.findByEmail(email);
        if (member.isPresent()){
            member.get().setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(member.get());
            return member.get();
        }else{
            return null;
        }
    }

    @Transactional
    public Member editUserName(String email,String newName){
        Optional<Member> member = userRepository.findByEmail(email);
        if (member.isPresent()){
            member.get().setName(newName);
            userRepository.save(member.get());
            return member.get();
        }else{
            return null;
        }
    }

    @Transactional
    public Member editUserEmail(String email,String newEmail){
        Optional<Member> member = userRepository.findByEmail(email);
        Optional<Member> newEmailDoubleCheck = userRepository.findByEmail(newEmail);

        if (newEmailDoubleCheck.isPresent()){
            return null;
        }
        if (member.isPresent()){
            member.get().setEmail(newEmail);
            userRepository.save(member.get());
            return member.get();
        }else{
            return null;
        }
    }

    @Transactional
    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

    @Transactional
    public void deleteUserAllInformation(Long id){
        Optional<Member> deleteUser = userRepository.findById(id);
        if (deleteUser.isPresent()){
            deleteAllUserReviews(deleteUser.get().getId());
            deleteUserAllTravelPlan(deleteUser.get().getId());
            deleteAllFavoritePlaces(deleteUser.get().getId());
        }
    }


    @Transactional
    private void deleteUserAllTravelPlan(Long userId){
        List<TravelPlan> deleteTravelPlans = travelPlanRepository.findByUserId(userId);
        for(TravelPlan travelPlan : deleteTravelPlans){
            Long deleteId = travelPlan.getId();
            travelPlanService.deleteTravelPlan(deleteId);
        }
    }

    public List<Place> getFavoritePlaceByUserId(Long userId){
        List<FavoritePlace> favoritePlaces = favoritePlaceRepository.findByUserId(userId);
        List<Place> userFavoritePlaces = new ArrayList<>();
        for(FavoritePlace place : favoritePlaces){
            Long placeId = place.getPlaceId();
            Optional<Place> selectPlace = placeRepository.findById(placeId);
            selectPlace.ifPresent(userFavoritePlaces::add);
        }
        return userFavoritePlaces;
    }

    @Transactional
    public FavoritePlace addFavoritePlace(Long userId,Long placeId){
        FavoritePlace newFavoritePlace = new FavoritePlace();
        newFavoritePlace.setUserId(userId);
        newFavoritePlace.setPlaceId(placeId);
        Optional<FavoritePlace> presentItemCheck = Optional.ofNullable(favoritePlaceRepository.findByUserIdAndPlaceId(userId, placeId));
        if (presentItemCheck.isPresent()){
            return null;
        }
        return favoritePlaceRepository.save(newFavoritePlace);
    }

    @Transactional
    public void deleteFavoritePlace(Long userId,Long placeId){
        Optional<FavoritePlace> deleteItem = Optional.ofNullable(favoritePlaceRepository.findByUserIdAndPlaceId(userId, placeId));
        deleteItem.ifPresent(favoritePlace -> favoritePlaceRepository.deleteById(favoritePlace.getId()));
    }

    @Transactional
    private void deleteAllFavoritePlaces(Long userId){
        List<FavoritePlace> favoritePlaces = favoritePlaceRepository.findByUserId(userId);
        for(FavoritePlace favoritePlace : favoritePlaces){
            Long deleteId = favoritePlace.getId();
            favoritePlaceRepository.deleteById(deleteId);
        }
    }

    @Transactional
    private void deleteAllUserReviews(Long userId){
        List<UserReview> userReviews = userReviewRepository.findByUserId(userId);
        for(UserReview userReview : userReviews){
            Long deleteId = userReview.getId();
            userReviewRepository.deleteById(deleteId);
        }
    }
}