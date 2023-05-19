package com.jinkyumpark.user.utils.email;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class Mail {
    private String fromAddress;
    private String toAddress;
    private String subject;
    private String content;

    @Builder
    public Mail(String toAddress, String subject, String content) {
        this.toAddress = toAddress;
        this.subject = subject;
        this.content = content;
    }
}
