package com.jinkyumpark.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class BooksItOutEureka {

    public static void main(String[] args) {
        SpringApplication.run(BooksItOutEureka.class, args);
    }

}
