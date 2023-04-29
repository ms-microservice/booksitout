package com.jinkyumpark.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class BookItOutConfig {
    public static void main(String[] args) {
        SpringApplication.run(BookItOutConfig.class, args);
    }
}
