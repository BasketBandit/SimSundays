package com.basketbandit.simsundays;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import tools.jackson.databind.JsonNode;

import java.time.Instant;

public record TelemetryFrameDto(Instant timestamp, Boolean gameDetected, JsonNode graphics, @JsonProperty("static") JsonNode statik) {
    public JsonObject graphicsAsJsonObject() {
        return JsonParser.parseString(graphics.toString()).getAsJsonObject();
    }
    public JsonObject staticAsJsonObject() {
        return JsonParser.parseString(statik.toString()).getAsJsonObject();
    }
}