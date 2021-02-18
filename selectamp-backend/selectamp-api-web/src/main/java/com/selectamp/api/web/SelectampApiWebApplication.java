package com.selectamp.api.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.selectamp")
public class SelectampApiWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(SelectampApiWebApplication.class, args);
    }

}
