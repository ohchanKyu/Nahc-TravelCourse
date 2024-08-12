package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.config.SecurityUtil;
import com.example.TravelCourseApplication.dto.FavoritePlace;
import com.example.TravelCourseApplication.dto.Member;
import com.example.TravelCourseApplication.dto.Place;
import com.example.TravelCourseApplication.service.AuthService;
import com.example.TravelCourseApplication.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/member")
// get login member information
public class UserController {

    private final UserService userService;

    public UserController(UserService memberService,AuthService authService){
        this.userService = memberService;
    }

    @GetMapping("/me")
    public ResponseEntity<Optional<Member>> findMemberInfoById(){
        return ResponseEntity.ok(userService.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<Member>> findMemberInfoByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.findMemberInfoByEmail(email));
    }

    @PostMapping("/editName")
    public ResponseEntity<Member> editUserName(@RequestParam("newName") String newName, @RequestParam("email") String email){
        return ResponseEntity.ok(userService.editUserName(email,newName));
    }

    @PostMapping("/editEmail")
    public ResponseEntity<Member> editUserEmail(@RequestParam("newEmail") String newEmail, @RequestParam("email") String email){
        return ResponseEntity.ok(userService.editUserEmail(email,newEmail));
    }

    @GetMapping("/checkPassword")
    public ResponseEntity<Boolean> checkUserPassword(@RequestParam("email") String email, @RequestParam("password") String password){
        return ResponseEntity.ok(userService.checkUserPassword(email,password));
    }

    @PostMapping("/editPassword")
    public ResponseEntity<Member> editUserPassword(@RequestParam("email") String email, @RequestParam("newPassword") String newPassword){
        return ResponseEntity.ok(userService.editUserPassword(email,newPassword));
    }

    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUserById(@RequestParam("id") Long id){
        userService.deleteUserAllInformation(id);
        userService.deleteUserById(id);
        return ResponseEntity.ok("Delete Success");
    }

    @GetMapping("/getFavoritesPlace")
    public ResponseEntity<List<Place>> getFavoritePlaces(@RequestParam("userId") Long userId){
        return ResponseEntity.ok(userService.getFavoritePlaceByUserId(userId));
    }

    @PostMapping("/favoritePlace")
    public ResponseEntity<FavoritePlace> addFavoritePlace(@RequestParam("userId") Long userId,@RequestParam("placeId") Long placeId){
        return ResponseEntity.ok(userService.addFavoritePlace(userId,placeId));
    }

    @DeleteMapping("/favoritePlace")
    public ResponseEntity<String> deleteFavoritePlace(@RequestParam("userId") Long userId, @RequestParam("placeId") Long placeId){
        userService.deleteFavoritePlace(userId,placeId);
        return ResponseEntity.ok("Delete Success");
    }
}