package fr.holytouch.chickencoffeeshopback.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name="chicken")
public class Chicken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    @NonNull
    private String name;

    @Column(name="fur")
    @NonNull
    private String fur;

    @Column(name="avatar_url")
    private String avatarURL;

    @Column(name="has_ordered")
    private boolean hasOrdered;

    @ManyToOne
    @JoinColumn(name="player_id", nullable = false)
    private Player master;

    @Column(name="order_passage")
    private int orderPassage;

    @Override
    public String toString() {
        return "Chicken{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", fur='" + fur + '\'' +
                '}';
    }
}
