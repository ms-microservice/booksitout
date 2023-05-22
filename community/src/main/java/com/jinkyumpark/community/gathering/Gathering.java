package com.jinkyumpark.community.gathering;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Gathering extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gatheringId;

    private String title;

    @Column(length = 2000)
    private String content;

    @Column(length = 10)
    @Enumerated(value = EnumType.STRING)
    private GatheringType type;

    @Column(length = 10)
    @Enumerated(value = EnumType.STRING)
    private GatheringLocationType locationType;

    @Column(length = 100)
    private String location;

    private Integer capacity;

    private Long appUserId;

    public Gathering update(Gathering gatheringToUpdate) {

        if (gatheringToUpdate.getTitle() != null) {
            this.title = gatheringToUpdate.getTitle();
        }

        if (gatheringToUpdate.getContent() != null) {
            this.content = gatheringToUpdate.getContent();
        }

        if (gatheringToUpdate.getType() != null) {
            this.type = gatheringToUpdate.getType();
        }

        if (gatheringToUpdate.getLocationType() != null) {
            this.locationType = gatheringToUpdate.locationType;
        }

        if (gatheringToUpdate.getLocation() != null) {
            this.location = gatheringToUpdate.getLocation();
        }

        if (gatheringToUpdate.getCapacity() != null) {
            this.capacity = gatheringToUpdate.getCapacity();
        }

        return this;
    }

}