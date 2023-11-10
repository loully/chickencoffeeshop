package fr.holytouch.chickencoffeeshopback.dto.view;

import fr.holytouch.chickencoffeeshopback.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChickenView {
    private int id;
    private String name;
    private String fur;
    private Integer masterId;
    private int orderPassage;
}
