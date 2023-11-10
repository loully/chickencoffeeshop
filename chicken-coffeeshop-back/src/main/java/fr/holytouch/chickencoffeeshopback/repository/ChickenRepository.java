package fr.holytouch.chickencoffeeshopback.repository;

import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChickenRepository extends CrudRepository<Chicken,Integer> {
}
