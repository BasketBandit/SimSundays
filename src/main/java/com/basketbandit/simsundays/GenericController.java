package com.basketbandit.simsundays;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class GenericController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}

