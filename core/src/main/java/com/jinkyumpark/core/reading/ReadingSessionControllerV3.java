package com.jinkyumpark.core.reading;

import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor

@RestController
@RequestMapping("v3/reading")
public class ReadingSessionControllerV3 {

    private final ReadingSessionService readingSessionService;

    @GetMapping("current")
    public ReadingSessionDto getCurrentReadingSessionDto(@LoginUser LoginAppUser loginAppUser) {
        return readingSessionService.getCurrentReadingSessionDto(loginAppUser.getId());
    }

}
