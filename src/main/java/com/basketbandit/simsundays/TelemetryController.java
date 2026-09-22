package com.basketbandit.simsundays;

import com.basketbandit.simsundays.socket.MapSocketHandler;
import com.google.gson.JsonObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class TelemetryController {
    @PostMapping("/update")
    public ResponseEntity<Void> handleTelemetry(@RequestBody TelemetryFrameDto frame) {
        if(frame.gameDetected()) {
            if(!frame.graphics().isEmpty()) {
                JsonObject graphics = frame.graphicsAsJsonObject();
                String name = graphics.get("driverName").getAsString() + " " + graphics.get("driverSurname").getAsString();
                SimSundaysApplication.players.getOrDefault(name, new Driver(name)).updateFrame(frame);
                MapSocketHandler.broadcastUpdate(SimSundaysApplication.players.get(name));
            }
        }
        return ResponseEntity.ok().build();
    }
}
