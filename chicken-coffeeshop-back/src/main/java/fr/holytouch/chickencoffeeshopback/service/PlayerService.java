package fr.holytouch.chickencoffeeshopback.service;

import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import fr.holytouch.chickencoffeeshopback.entity.Player;
import fr.holytouch.chickencoffeeshopback.repository.PlayerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(final PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player createPlayer(String pseudo){
        if(playerRepository.findFirstByPseudo(pseudo) == null) {
            Player player = new Player(pseudo);
            player.setPlaying(true);
            player.setSubscriptionDate(LocalDate.now());
            return this.playerRepository.save(player);
        } else {
            return this.playerRepository.findFirstByPseudo(pseudo);
        }
    }

    public void insertPlayers(List<String> names) {
        names.forEach((name) -> playerRepository.save(new Player(name))
        );
    }

    public Player setChickensByPlayerPseudo(List<Chicken> chickens, String pseudo){
        Player targetPlayer = playerRepository.findFirstByPseudo(pseudo);
        if(!chickens.isEmpty() && chickens.get(0) != null){
            targetPlayer.setChickens(new ArrayList<>(chickens));
            return targetPlayer;
        } else {
            log.error("Chickens are not valid: {} for player {}", chickens.stream().distinct().collect(Collectors.toList()), pseudo);
            return null;
        }
    }

    public Player getPlayerByPseudo(String pseudo){
        return playerRepository.findFirstByPseudo(pseudo);
    }

    public Optional<Player> getPlayerById(Integer id){
        return playerRepository.findById(id);
    }

    public Optional<Player> getPlayerByIdAndPseudo(int id, String pseudo) {
        return playerRepository.findFirstByIdAndPseudo(id, pseudo);
    }
}
