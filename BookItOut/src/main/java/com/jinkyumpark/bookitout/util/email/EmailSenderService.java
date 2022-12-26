package com.jinkyumpark.bookitout.util.email;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailSenderService {
    private JavaMailSender javaMailSender;

    private final String BOOK_IT_OUT_OFFICIAL_EMAIL = "jinpark1025@gmail.com";

    public void sendEmail(Mail mail) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(BOOK_IT_OUT_OFFICIAL_EMAIL);
        simpleMailMessage.setTo(mail.getToAddress());
        simpleMailMessage.setSubject(mail.getSubject());
        simpleMailMessage.setText(mail.getContent());

        javaMailSender.send(simpleMailMessage);
    }
}
