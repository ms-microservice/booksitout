package com.jinkyumpark.community.gathering.join;

import com.jinkyumpark.community.config.jpa.TimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class GatheringJoin extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gatheringJoinId;

    private Long appUserId;
    private Long gatheringId;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false, length = 10)
    @Enumerated(value = EnumType.STRING)
    private GatheringJoinStatus status;

    public GatheringJoin update(GatheringJoin gatheringJoinToUpdate) {

        if (gatheringJoinToUpdate.getContent() != null) {
            this.content = gatheringJoinToUpdate.getContent();
        }

        return this;
    }

    public GatheringJoin updateStatus(GatheringJoinStatus gatheringJoinStatus) {
        if (gatheringJoinStatus != null) {
            this.status = gatheringJoinStatus;
        }

        return this;
    }

}
