package com.jinkyumpark.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class BooksItOutConfig {
    public static void main(String[] args) {
        SpringApplication.run(BooksItOutConfig.class, args);
    }
}
