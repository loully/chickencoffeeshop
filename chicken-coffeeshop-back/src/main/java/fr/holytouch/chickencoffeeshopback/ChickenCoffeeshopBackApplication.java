package fr.holytouch.chickencoffeeshopback;

import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import fr.holytouch.chickencoffeeshopback.entity.Player;
import fr.holytouch.chickencoffeeshopback.repository.PlayerRepository;
import fr.holytouch.chickencoffeeshopback.service.PlayerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;


@SpringBootApplication
@Slf4j
public class ChickenCoffeeshopBackApplication {

	@Autowired
	private PlayerService playerservice;

	public static void main(String[] args) {

		SpringApplication.run(ChickenCoffeeshopBackApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner run(PlayerRepository repo){
//		return (arg) -> {
//			String playerName = "Limbo";
//			playerservice.insertPlayers(Arrays.asList("Poupchat", playerName, "Mérou", "Kimo"));
//
//			log.info("Players: {}",repo.findAll());
//			List<Chicken> chickens = Arrays.asList(new Chicken("Poupounette","blanche"), new Chicken("La cheffe", "rousse"), new Chicken("La maline","rousse"));
//
//			playerservice.setChickensToPlayer(chickens,playerName);
//			log.info("Player : {} - Chickens: {}",playerName, chickens);
//		};
//	}

}
