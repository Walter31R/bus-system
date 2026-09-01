package com.example.Backend_Bus.Controller;

import com.example.Backend_Bus.Security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Endpoint libre: recibe usuario y contraseña, devuelve el token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Validación simple — después se puede conectar a una tabla de usuarios
        if ("admin".equals(username) && "1234".equals(password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401)
                .body(Map.of("error", "Credenciales inválidas"));
    }
}
