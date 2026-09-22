package com.basketbandit.simsundays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;

@SpringBootApplication
public class SimSundaysApplication {
    public static HashMap<String, Driver> players = new HashMap<>();

    public static void main(String[] args) {
        SpringApplication.run(SimSundaysApplication.class, args);
    }
}
