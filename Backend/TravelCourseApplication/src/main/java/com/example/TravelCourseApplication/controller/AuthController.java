package com.example.TravelCourseApplication.controller;

import com.example.TravelCourseApplication.dto.Member;
import com.example.TravelCourseApplication.dto.Token;
import com.example.TravelCourseApplication.service.AuthService;
import com.example.TravelCourseApplication.service.MailService;
import com.example.TravelCourseApplication.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final MailService mailService;
    private final UserService userService;

    public AuthController(AuthService authService, MailService mailService,UserService userService){
        this.authService = authService;
        this.mailService = mailService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Member> createMember(@RequestBody Member member){
        return ResponseEntity.ok(authService.createNewMember(member));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginMember(@RequestParam("email") String email, @RequestParam("password") String password){
        return ResponseEntity.ok(authService.loginProcess(email,password));
    }

    @PostMapping("/logout")
    public void logoutMember(){

    }

    @PostMapping("/reissue")
    public ResponseEntity<Token> refreshToken(@RequestBody Token token){
        return ResponseEntity.ok(authService.reCheckToken(token));
    }

    @GetMapping("/findEmail")
    public ResponseEntity<List<String>> findEmailByUserName(@RequestParam("name") String name){
        return ResponseEntity.ok(userService.getEmailsByUserName(name));
    }
    @PostMapping("/editPassword")
    public ResponseEntity<Member> editUserPassword(@RequestParam("newPassword") String newPassword, @RequestParam("email") String email){
        return ResponseEntity.ok(userService.editUserPassword(email,newPassword));
    }

    @GetMapping("/sendMail")
    public ResponseEntity<String> getAuthenticatedNumber(@RequestParam("email") String email) {
        Member member = userService.getUserByEmail(email);
        if (member != null) {
            return ResponseEntity.ok(mailService.sendMessage(email));
        } else {
            return null;
        }
    }
}