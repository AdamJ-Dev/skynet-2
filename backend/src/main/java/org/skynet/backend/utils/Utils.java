package org.skynet.backend.utils;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class Utils {

    static final Logger logger = LoggerFactory.getLogger(Utils.class);

    public static <T> Mono<T> get(String url, Class<T> bodyType) {
        return WebClient.builder()
                .build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(bodyType);
    }

    public static JsonNode getJson(String url) {
        return get(url, JsonNode.class).block();
    }
}
