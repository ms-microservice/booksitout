package com.jinkyumpark.library.library.batch;

import org.springframework.batch.core.step.skip.SkipLimitExceededException;
import org.springframework.batch.core.step.skip.SkipPolicy;
import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.PersistenceException;

public class UniqueConstraintFailSkipPolicy implements SkipPolicy {

    @Override
    public boolean shouldSkip(Throwable t, int skipCount) throws SkipLimitExceededException {
        return t instanceof DataIntegrityViolationException | t instanceof PersistenceException;
    }

}
