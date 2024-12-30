package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // Ruta para recibir un mensaje (POST)
    @PostMapping("/messages")
    public void sendMessage(@RequestBody ChatMessage message) {
    	System.out.println("Mensaje recibido: " + message.getSender() + " - " + message.getContent());
    	// Aquí agregamos el mensaje al servicio
        chatService.addMessage(message);
    }

    // Ruta para obtener mensajes desde un ID dado (GET), por si necesitas consultar mensajes
    @GetMapping("/messages")
    public List<ChatMessage> getMessages(@RequestParam long lastMessageId) {
        return chatService.getMessagesSince(lastMessageId);
    }
}
