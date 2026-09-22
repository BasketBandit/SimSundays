package com.basketbandit.simsundays.event;

import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private static Event event;

    public static void startNewEvent(JsonObject object) {
        event = new Event(object);
    }

    public static Event currentEvent() {
        return event;
    }

    public static boolean hasEvent() {
        return event != null;
    }
}
