package fr.holytouch.chickencoffeeshopback.controller;

import fr.holytouch.chickencoffeeshopback.entity.Player;
import fr.holytouch.chickencoffeeshopback.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/player")
    public Player createPlayer(@RequestBody String playerName){
        return playerService.createPlayer(playerName);
    }

    @GetMapping("/player/{playername}")
    public Player getPlayer(@PathVariable("playername") String playerName) { return playerService.getPlayerByPseudo(playerName); }
}
