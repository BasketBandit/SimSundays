package com.basketbandit.simsundays.entity;

public class Car {
    String model;

    public Car() {}

    public Car(String model) {
        this.model = model;
    }

    public String getModel() {
        return model != null ? model : "none";
    }

    public void setModel(String model) {
        this.model = model;
    }
}
