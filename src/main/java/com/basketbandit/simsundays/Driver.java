package com.basketbandit.simsundays;

import com.basketbandit.simsundays.entity.Car;
import com.basketbandit.simsundays.entity.Time;
import com.basketbandit.simsundays.entity.Track;
import com.google.gson.JsonObject;

import java.util.List;
import java.util.Optional;

public class Driver {
    String name;
    String nation;

    String gameVersion;

    Track track;
    Car car;

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

    List<Time> times;

    public Driver(String name) {
        this.name = name;
    }

    public void updateFrame(TelemetryFrameDto frame) {
        JsonObject graphics = frame.graphicsAsJsonObject();
        JsonObject staticData = frame.staticAsJsonObject();

        this.gameVersion = staticData.get("acEvoVersion").getAsString();

        this.nation = staticData.get("nation").getAsString();

        String t = staticData.get("track").getAsString();
        String c = staticData.get("trackConfiguration").getAsString();
        if(!track.getName().equals(t) || !track.getLayout().equals(c)) {
            this.track = new Track(t, c);
        }

        String m = graphics.get("carModel").getAsString();
        if(!car.getModel().equals(m)) {
            this.car = new Car(m);
        }

        this.speedMph = graphics.get("displaySpeedMph").getAsInt();
        this.speedKmh = graphics.get("displaySpeedKmh").getAsInt();
        this.gear = graphics.get("gearInt").getAsInt();
        this.acceleratorPercent = graphics.get("gasPercent").getAsFloat();
        this.brakePercent = graphics.get("brakePercent").getAsFloat();
        this.clutchPercent = graphics.get("clutchPercent").getAsFloat();

        this.lastLaptimeMs = graphics.get("lastLaptimeMs").getAsInt();
        this.deltaTimeMs = graphics.get("deltaTimeMs").getAsInt();
        this.currentLapTimeMs = graphics.get("currentLapTimeMs").getAsInt();
        this.predictedLapTimeMs = graphics.get("predictedLapTimeMs").getAsInt();
        this.isValidLap = graphics.get("isValidLap").getAsBoolean();
        this.totalLapCount = graphics.get("totalLapCount").getAsInt();

        int newBestLapTime = graphics.get("bestLaptimeMs").getAsInt();
        if(isValidLap && newBestLapTime < bestLaptimeMs) {
            Optional<Time> time = times.stream().filter(ti -> ti.signature().equals(String.format("%s - %s - %s", track.getName(), track.getLayout(), car.getModel()))).findAny();
            if(time.isPresent()) {
                time.get().setLapTimeMs(newBestLapTime);
            } else {
                times.add(new Time(track, car, newBestLapTime));
            }
            bestLaptimeMs = newBestLapTime;
        }
    }
}
