package com.basketbandit.simsundays;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GenericController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}

