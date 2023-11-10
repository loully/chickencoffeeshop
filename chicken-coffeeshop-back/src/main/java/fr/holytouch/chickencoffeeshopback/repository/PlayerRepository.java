package fr.holytouch.chickencoffeeshopback.repository;

import fr.holytouch.chickencoffeeshopback.entity.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends CrudRepository<Player, Integer> {

    Player findFirstByPseudo(String pseudo);

    Optional<Player> findFirstByIdAndPseudo(int id, String pseudo);
}
