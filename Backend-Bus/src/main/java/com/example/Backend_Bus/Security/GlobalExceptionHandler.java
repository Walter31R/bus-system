package com.example.Backend_Bus.Security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> manejarExcepciones(ResponseStatusException ex) {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("message", ex.getReason());

        return new ResponseEntity<>(respuesta, ex.getStatusCode());
    }
}
