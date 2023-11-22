package fr.holytouch.chickencoffeeshopback.repository;

import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChickenRepository extends CrudRepository<Chicken,Integer> {

    Optional<List<Chicken>> findAllByMasterId(Integer masterId);

}
