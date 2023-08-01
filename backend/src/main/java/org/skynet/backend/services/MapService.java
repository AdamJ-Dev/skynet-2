package org.skynet.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.rest.dtos.MapDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MapService {

    static final Logger logger = LoggerFactory.getLogger(MapService.class);
    private final String GOOGLE_MAPS_API_KEY = System.getenv("GOOGLE_MAPS_API_KEY");
    private WebClient.Builder builder;

    @Autowired
    public MapService(WebClient.Builder builder) {
        super();
        this.builder = builder;
    }

    @GetMapping("/map/{latitude},{longitude}")
    public Mono<MapDTO> getMap(@PathVariable String lat, @PathVariable String lon) {
        String url = String.format("https://maps.googleapis.com/maps/api/staticmap?center=%s,%s&zoom=10&size=320x320&key=%s", lat, lon, GOOGLE_MAPS_API_KEY);

        return builder.build()
                .get()
                .uri(url)
                .retrieve()
                .onStatus(status -> status.isError(), response -> {
                    HttpStatusCode code = response.statusCode();
                    return response.bodyToMono(JsonNode.class).map(body -> {
                        String reason = body.get("reason").asText();
                        return new ResponseStatusException(code, reason);
                    });
                })
                .bodyToMono(byte[].class)
                .map(Base64.getEncoder()::encodeToString)
                .map(MapDTO::new)
                .doOnError(throwable -> {
                    if (!(throwable instanceof ResponseStatusException)) {
                        logger.error(throwable.getMessage());
                        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                });
    }
}
