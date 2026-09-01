package com.example.Backend_Bus.Controller;



import com.example.Backend_Bus.Model.Marca;
import com.example.Backend_Bus.Service.MarcaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/marca")
public class MarcaController {

    private final MarcaService marcaService;

    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService; // ← corregido
    }

    @GetMapping
    public List<Marca> listar() {
        return marcaService.listarMarcas();
    }
}
