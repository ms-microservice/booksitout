package com.jinkyumpark.bookitout.model.book;

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
        return dbData.equals(1);
    }
}
