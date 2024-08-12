package com.example.TravelCourseApplication.service;

import com.example.TravelCourseApplication.dto.Authority;
import com.example.TravelCourseApplication.dto.Member;
import com.example.TravelCourseApplication.dto.RefreshToken;
import com.example.TravelCourseApplication.dto.Token;
import com.example.TravelCourseApplication.jwt.TokenProvider;
import com.example.TravelCourseApplication.repository.RefreshTokenRepository;
import com.example.TravelCourseApplication.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${admin.email}")
    private String adminEmail;
    @Value("${admin.name}")
    private String adminName;


    @Transactional
    public Member createNewMember(Member member){
        if (userRepository.existsByEmail(member.getEmail())){
            return null;
        }
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        if (member.getEmail().equals(adminEmail) &&
                member.getName().equals(adminName)){
            member.setAuthority(Authority.valueOf("ROLE_ADMIN"));
        }else{
            member.setAuthority(Authority.valueOf("ROLE_USER"));
        }
        return userRepository.save(member);
    }

    @Transactional
    public Map<String,Object> loginProcess(String email, String password){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,password);

        Map<String,Object> loginMemberInformationAndToken = new HashMap<>();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Token token = tokenProvider.generateTokenDto(authentication);

        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(token.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);
        Optional<Member> loginMember = userRepository.findByEmail(email);
        loginMemberInformationAndToken.put("TOKEN",token);
        loginMemberInformationAndToken.put("MEMBER",loginMember.get());
        return loginMemberInformationAndToken;

    }

    @Transactional
    public Token reCheckToken(Token token){
        if (!tokenProvider.validateToken(token.getRefreshToken())){
            log.info("Refresh Token is not Valid!");
            throw new RuntimeException("Refresh Token is not Valid");
        }
        Authentication authentication = tokenProvider.getAuthentication(token.getAccessToken());

        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Already Logout User!"));

        if (!refreshToken.getValue().equals(token.getRefreshToken())){
            log.info("Not Equals Token user information!");
            throw new RuntimeException("Not Equals Token user information!");
        }

        Token newToken = tokenProvider.generateTokenDto(authentication);
        RefreshToken newRefreshToken = refreshToken.updateValue(newToken.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);
        return newToken;
    }

}
