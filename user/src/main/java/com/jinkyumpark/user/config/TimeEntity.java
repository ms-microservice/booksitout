package com.jinkyumpark.user.config;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class TimeEntity {

    @JsonIgnore
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @CreatedDate
    private LocalDateTime createdDate;

    @JsonIgnore
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

}
