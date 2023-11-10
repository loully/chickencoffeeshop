package fr.holytouch.chickencoffeeshopback.dto.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ChickenPayload {
    private String name;
    private String fur;
    private Integer masterId;

    @Override
    public String toString() {
        return "ChickenPayload{" +
                ", name='" + name + '\'' +
                ", fur='" + fur + '\'' +
                ", masterId=" + masterId +
                '}';
    }
}
