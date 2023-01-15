package com.jinkyumpark.bookitout.util.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@PropertySource("classpath:application.properties")
@Service
public class EmailSender {
    private final JavaMailSender javaMailSender;
    private final String BOOK_IT_OUT_OFFICIAL_EMAIL;

    public EmailSender(JavaMailSender javaMailSender,
                       @Value("${spring.mail.username}") String BOOK_IT_OUT_OFFICIAL_EMAIL) {
        this.javaMailSender = javaMailSender;
        this.BOOK_IT_OUT_OFFICIAL_EMAIL = BOOK_IT_OUT_OFFICIAL_EMAIL;
    }

    public void sendEmail(Mail mail) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(BOOK_IT_OUT_OFFICIAL_EMAIL);
        simpleMailMessage.setTo(mail.getToAddress());
        simpleMailMessage.setSubject(mail.getSubject());
        simpleMailMessage.setText(mail.getContent());

        javaMailSender.send(simpleMailMessage);
    }
}