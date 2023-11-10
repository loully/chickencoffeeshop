package fr.holytouch.chickencoffeeshopback.controller;


import fr.holytouch.chickencoffeeshopback.dto.payload.ChickenPayload;
import fr.holytouch.chickencoffeeshopback.dto.view.ChickenView;
import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import fr.holytouch.chickencoffeeshopback.service.ChickenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/chicken")
@RestController
public class ChickenController {

    @Autowired
    private ChickenService chickenService;

    @PostMapping(value="/new")
    public ChickenView createChicken(@RequestBody final ChickenPayload chickenPayload){
        log.info(String.valueOf(chickenPayload));
        return chickenService.createChicken(chickenPayload);
    }
}
