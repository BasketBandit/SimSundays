package com.basketbandit.simsundays.event;

import com.google.gson.JsonObject;

public class Event {
    public String car;
    public String carClass;
    public String track;
    public String layout;
    public String time;
    public String timeDesc;
    public String weather;
    public String weatherCond;
    public int totalSeconds;
    public long startTimestamp;

    public Event(JsonObject object) {
        this.car = object.get("car").getAsString();
        this.carClass = object.get("carClass").getAsString();
        this.track = object.get("track").getAsString();
        this.layout = object.get("layout").getAsString();
        this.time = object.get("time").getAsString();
        this.timeDesc = object.get("timeDesc").getAsString();
        this.weather = object.get("weather").getAsString();
        this.weatherCond = object.get("weatherCond").getAsString();
        this.totalSeconds = object.get("totalSeconds").getAsInt();
        this.startTimestamp = object.get("startTimestamp").getAsLong();
    }
}
