package com.basketbandit.simsundays.entity;

public class Track {
    String name;
    String layout;

    public Track() {}

    public Track(String name, String layout) {
        this.name = name;
        this.layout = layout;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLayout() {
        return layout != null ? layout : "default";
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }
}
