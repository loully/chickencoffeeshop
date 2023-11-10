package fr.holytouch.chickencoffeeshopback.dto.payload;

import fr.holytouch.chickencoffeeshopback.entity.Chicken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PlayerPayload {
    private int id;
    private String pseudo;
    private List<ChickenPayload> chickens;
}
