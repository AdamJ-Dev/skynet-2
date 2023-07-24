package org.skynet.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import org.skynet.backend.services.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.function.client.WebClient;

public class Utils {

    static final Logger logger = LoggerFactory.getLogger(Utils.class);

    public static JsonNode getJson(String url) {
        String json = WebClient.builder().build().get().uri(url).retrieve().bodyToMono(String.class).block();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = objectMapper.readTree(json);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
            return JsonNodeFactory.instance.objectNode();
        }
        return jsonNode;
    }
}
