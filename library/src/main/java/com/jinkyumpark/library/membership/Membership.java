package com.jinkyumpark.library.membership;

import com.jinkyumpark.library.membership.type.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table
public class Membership {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryMembershipId;

    @Column(length = 20)
    private String number;

    @Column(name = "app_user_id", nullable = false)
    private Long appUserId;

    @ManyToOne @JoinColumn(name = "membership_type_id")
    private MembershipType type;

    @Column(name = "memo")
    private String memo;

    @Column(name = "last_used_date")
    private LocalDateTime lastUsedDate;

    public void useMembership() {
        this.lastUsedDate = LocalDateTime.now();
    }

    public Membership update(Membership toUpdate) {

        if (toUpdate.getNumber() != null) {
            this.number = toUpdate.getNumber();
        }

        if (toUpdate.getType() != null) {
            this.type = toUpdate.getType();
        }

        if (toUpdate.memo != null) {
            this.memo = toUpdate.getMemo();
        }

        return this;
    }

    public String getName() {
        if (type.getRegionDetail() != null) {
            return type.getRegionDetail().getKoreanName();
        }

        if (type.getRegion() != null) {
            return type.getRegion().getKoreanName();
        }

        return type.getName();
    }

    public String getLogo() {
        if (type.getRegionDetail() != null) {
            return type.getRegionDetail().getLogo();
        }

        if (type.getRegion() != null) {
            return type.getRegion().getLogo();
        }

        return type.getLogo();
    }

}
