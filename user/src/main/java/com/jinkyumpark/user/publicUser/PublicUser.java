package com.jinkyumpark.user.publicUser;

import com.jinkyumpark.user.appUser.AppUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@Entity @Table
public class PublicUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long publicUserId;

    private String nickName;
    private String profileImage;

    @OneToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    @Builder
    public PublicUser(String nickName, String profileImage, Long appUserId) {
        this.nickName = nickName;
        this.profileImage = profileImage;
        this.appUser = AppUser.builder().appUserId(appUserId).build();
    }

    public PublicUser update(String nickName, String profileImage) {
        if (nickName != null) {
            this.nickName = nickName;
        }

        if (profileImage != null) {
            this.profileImage = profileImage;
        }

        return this;
    }

}
