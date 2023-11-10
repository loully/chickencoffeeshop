package fr.holytouch.chickencoffeeshopback.service;

import fr.holytouch.chickencoffeeshopback.dto.payload.ChickenPayload;
import fr.holytouch.chickencoffeeshopback.dto.view.ChickenView;
import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import fr.holytouch.chickencoffeeshopback.entity.Player;
import fr.holytouch.chickencoffeeshopback.repository.ChickenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ChickenService {
    final private ChickenRepository chickenRepository;
    final private PlayerService playerService;

    public ChickenService(ChickenRepository chickenRepository, PlayerService playerService) {
        this.chickenRepository = chickenRepository;
        this.playerService = playerService;
    }


    public ChickenView createChicken(ChickenPayload payload) {
        log.info(String.valueOf(payload));
        Chicken chicken = new Chicken(payload.getName(), payload.getFur());
        Optional<Player> masterOfChicken = playerService.getPlayerById(payload.getMasterId());
        Optional<Chicken> existingChicken = masterOfChicken.get().getChickens().stream()
                .filter(chick -> chick.getName()==chicken.getName() && chick.getFur() == chicken.getFur()).findFirst();

        if(masterOfChicken.isPresent()) {
            log.info("master find: {}", masterOfChicken);
            if(!existingChicken.isPresent()) {
                chicken.setMaster(masterOfChicken.get());
                masterOfChicken.get().setChickens(new ArrayList<>(Arrays.asList(chicken)));
                int position = masterOfChicken.get().getChickens().indexOf(chicken);
                chicken.setOrderPassage(position);
                chicken.setHasOrdered(false);
                log.info("Chicken save: {}",chicken);
                chickenRepository.save(chicken);
                return new ChickenView(chicken.getId(), chicken.getName(), chicken.getFur(), payload.getMasterId(), chicken.getOrderPassage());
            } else {
                log.info("Chicken found: {}",existingChicken.get());
                return new ChickenView(existingChicken.get().getId(),existingChicken.get().getName(),existingChicken.get().getFur(), masterOfChicken.get().getId(), chicken.getOrderPassage());
            }
        } else {
            log.error("Master not found");
            return new ChickenView(chicken.getId(), chicken.getName(), chicken.getFur(), payload.getMasterId(), chicken.getOrderPassage());
        }
    }
}
