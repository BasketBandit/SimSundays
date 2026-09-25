package com.basketbandit.simsundays.entity;

public class Time {
    Track track;
    Car car;
    long lapTimeMs;

    public Time() {}

    public Time(Track track, Car car, long lapTimeMs) {
        this.track = track;
        this.car = car;
        this.lapTimeMs = lapTimeMs;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public long getLapTimeMs() {
        return lapTimeMs;
    }

    public void setLapTimeMs(long lapTimeMs) {
        this.lapTimeMs = lapTimeMs;
    }

    public String signature() {
        return String.format("%s - %s - %s", track.getName(), track.getLayout(), car.getModel());
    }
}
