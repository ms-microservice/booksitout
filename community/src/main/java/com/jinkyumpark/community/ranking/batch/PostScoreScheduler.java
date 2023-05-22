package com.jinkyumpark.community.ranking.batch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor

@Configuration
@EnableScheduling
public class PostScoreScheduler {

    private final JobLauncher jobLauncher;
    private final Job postScoreJob;

    private final String everyDayAtMidnight = "0 0 0 * * ?";
    private final String everyHour = "0 0 * * * *";
    private final String every2Hour = "0 0/2 * * *";

    @Scheduled(cron = everyHour)
    public void run() throws JobParametersInvalidException, JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException {
        log.info("Post Score Job Running at {}", LocalDateTime.now());

        JobParameters parameter = new JobParametersBuilder()
                .addString("JobID", String.valueOf(System.currentTimeMillis()))
                .toJobParameters();

        jobLauncher.run(postScoreJob, parameter);
    }

}
