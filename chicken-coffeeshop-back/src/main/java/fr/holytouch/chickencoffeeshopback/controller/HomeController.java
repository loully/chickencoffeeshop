package fr.holytouch.chickencoffeeshopback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String index(){
        return "Go go Chicken Coffee Shop !";
    }
}
