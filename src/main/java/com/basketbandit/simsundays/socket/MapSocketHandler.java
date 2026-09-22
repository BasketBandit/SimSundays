package com.basketbandit.simsundays.socket;

import com.basketbandit.simsundays.Driver;
import com.basketbandit.simsundays.SimSundaysApplication;
import com.basketbandit.simsundays.event.EventService;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class MapSocketHandler extends TextWebSocketHandler {
    private static final Logger log = LoggerFactory.getLogger(MapSocketHandler.class);
    private static final CopyOnWriteArrayList<WebSocketSession> clients = new CopyOnWriteArrayList<>();
    private static final Gson gson = new Gson();

    public synchronized static void broadcastPing() {
        clients.forEach(client -> {
            try {
                client.sendMessage(new TextMessage("ping"));
            } catch(IOException e) {
                log.warn("There was a problem contacting client, reason: {}", e.getMessage(), e);
            }
        });
    }

    public synchronized static void broadcastUpdate(Driver driver) {
        clients.forEach(client -> {
            try {
                client.sendMessage(new TextMessage("update:" + gson.toJson(driver)));
            } catch(IOException e) {
                log.warn("There was a problem contacting client, reason: {}", e.getMessage(), e);
            }
        });
    }

    public synchronized static void broadcastEvent() {
        clients.forEach(client -> {
            try {
                if(EventService.hasEvent()) {
                    client.sendMessage(new TextMessage("event:" + gson.toJson(EventService.currentEvent())));
                }
            } catch(IOException e) {
                log.warn("There was a problem contacting client, reason: {}", e.getMessage(), e);
            }
        });
    }

    @Override
    public void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) {
        try {
            if(!session.isOpen()) {
                session.close();
                return;
            }

            if(message.getPayload().equals("init")) {
                // should really replace this with a bulk update
                for(Driver driver : SimSundaysApplication.players.values()) {
                    session.sendMessage(new TextMessage("update:" + gson.toJson(driver)));
                }
                if(EventService.hasEvent()) {
                    session.sendMessage(new TextMessage("event:" + gson.toJson(EventService.currentEvent())));
                }
            }

            if(message.getPayload().startsWith("event:")) {
                EventService.startNewEvent(JsonParser.parseString(message.getPayload().substring(6)).getAsJsonObject());
                broadcastEvent();
            }
        } catch(Exception e) {
            log.error("There was an error handling message: {}", e.getMessage(), e);
        }
    }

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        clients.add(session);
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        clients.remove(session);
    }
}
