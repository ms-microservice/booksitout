package com.jinkyumpark.core.book.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanTo01Converter implements AttributeConverter<Boolean, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Boolean attribute) {
        return attribute ? 1 : 0;
    }

    @Override
    public Boolean convertToEntityAttribute(Integer dbData) {
        if (dbData == null) return false;

        return dbData.equals(1);
    }
}
