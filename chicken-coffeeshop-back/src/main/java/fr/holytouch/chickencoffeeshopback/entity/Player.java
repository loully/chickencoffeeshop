package fr.holytouch.chickencoffeeshopback.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name="player")
public class Player {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="pseudo")
    @NonNull
    private String pseudo;

    @JsonIgnore
    @OneToMany(mappedBy = "master", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Chicken> chickens;

    @Column(name="avatar_url")
    private String avatarURL;

    @Column(name="subscription-date")
    private LocalDate subscriptionDate;

    @Column(name="is_playing")
    private boolean isPlaying;


    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", pseudo='" + pseudo + '\'' +
                '}';
    }
}
