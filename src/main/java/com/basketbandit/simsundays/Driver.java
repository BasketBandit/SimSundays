package com.basketbandit.simsundays;

import com.google.gson.JsonObject;

public class Driver {
    String name;
    String nation;

    String gameVersion;

    String track;
    String trackConfiguration;
    String carModel;

    int speedMph;
    int speedKmh;
    int gear;

    float acceleratorPercent;
    float brakePercent;
    float clutchPercent;

    int totalLapCount;
    int lastLaptimeMs;
    int bestLaptimeMs;
    int deltaTimeMs;
    int currentLapTimeMs;
    int predictedLapTimeMs;
    boolean isValidLap;

    public Driver(String name) {
        this.name = name;
    }

    public void updateFrame(TelemetryFrameDto frame) {
        JsonObject graphics = frame.graphicsAsJsonObject();
        JsonObject staticData = frame.staticAsJsonObject();

        this.nation = staticData.get("nation").getAsString();;

        this.gameVersion = staticData.get("acEvoVersion").getAsString();

        this.track = staticData.get("track").getAsString();
        this.trackConfiguration = staticData.get("trackConfiguration").getAsString();

        this.carModel = graphics.get("carModel").getAsString();
        this.speedMph = graphics.get("displaySpeedMph").getAsInt();
        this.speedKmh = graphics.get("displaySpeedKmh").getAsInt();
        this.gear = graphics.get("gearInt").getAsInt();
        this.acceleratorPercent = graphics.get("gasPercent").getAsFloat();
        this.brakePercent = graphics.get("brakePercent").getAsFloat();
        this.clutchPercent = graphics.get("clutchPercent").getAsFloat();

        this.totalLapCount = graphics.get("totalLapCount").getAsInt();
        this.lastLaptimeMs = graphics.get("lastLaptimeMs").getAsInt();
        this.bestLaptimeMs = graphics.get("bestLaptimeMs").getAsInt();
        this.deltaTimeMs = graphics.get("deltaTimeMs").getAsInt();
        this.currentLapTimeMs = graphics.get("currentLapTimeMs").getAsInt();
        this.predictedLapTimeMs = graphics.get("predictedLapTimeMs").getAsInt();
        this.isValidLap = graphics.get("isValidLap").getAsBoolean();
    }
}
