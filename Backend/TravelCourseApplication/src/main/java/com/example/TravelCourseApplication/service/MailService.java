package com.example.TravelCourseApplication.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    @Value("${admin.send.email}")
    private String ADMIN_SEND_EMAIL;

    private final JavaMailSender emailSender;

    public String sendMessage(String email){
        String generatedString = RandomStringUtils.randomAlphanumeric(10);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(ADMIN_SEND_EMAIL);
        message.setTo(email);
        message.setSubject("Welcome to NaHC Travel_Course Application!");
        message.setText("Authentication String : " + generatedString);
        emailSender.send(message);
        return generatedString;
    }
}
