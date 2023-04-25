package com.jinkyumpark.user.restTemplate;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(ObjectMapper objectMapper) {
        RestTemplate restTemplate = new RestTemplate();

        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper);
        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));

        restTemplate.getMessageConverters().removeIf(c -> c instanceof MappingJackson2HttpMessageConverter);
        restTemplate.getMessageConverters().add(converter);

        return restTemplate;
    }

    @Bean
    public ObjectMapper underBarWithLowerCaseToCamel() {
        ObjectMapper mapper = JsonMapper.builder()
                .build();

        JavaTimeModule javaTimeModule = new JavaTimeModule();
        LocalDateTimeSerializer localDateTimeSerializer = new LocalDateTimeSerializer(DateTimeFormatter.ISO_LOCAL_DATE_TIME.withZone(ZoneId.of("Asia/Seoul")));
        javaTimeModule.addSerializer(LocalDateTime.class, localDateTimeSerializer);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        mapper.registerModule(
                new SimpleModule().addDeserializer(String.class, new StdDeserializer<>(String.class) {
                    @Override
                    public String deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
                        return p.getValueAsString()
                                .replaceAll("\\'", "\\'");
                    }
                })
        );

        return mapper;
    }
}
