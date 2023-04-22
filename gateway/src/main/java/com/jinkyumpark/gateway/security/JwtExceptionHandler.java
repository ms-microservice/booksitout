package com.jinkyumpark.gateway.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class JwtExceptionHandler implements ErrorWebExceptionHandler {

    private final ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable exception) {

        if (exception instanceof ResponseStatusException) {
            ResponseStatusException responseStatusException = (ResponseStatusException) exception;
            HttpStatus status = responseStatusException.getStatus();
            String message = responseStatusException.getMessage();

            JwtException responseBody = JwtException.builder()
                    .status(status.value())
                    .message(message)
                    .build();

            byte[] bytes = objectMapper.writeValueAsBytes(responseBody);

            exchange.getResponse().getHeaders().add("Content-Type", "application/json");
            exchange.getResponse().setRawStatusCode(status.value());

            return exchange
                    .getResponse()
                    .writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(bytes)))
                    .then(
                            Mono.fromRunnable(() -> {
                                exchange.getResponse().setStatusCode(status);
                            })
                    );
        }

        return Mono.error(exception);
    }

}