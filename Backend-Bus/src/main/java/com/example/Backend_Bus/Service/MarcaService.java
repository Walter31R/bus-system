package com.example.Backend_Bus.Service;

import com.example.Backend_Bus.Model.Marca;
import com.example.Backend_Bus.Repository.MarcaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MarcaService {

    private final MarcaRepository marcaRepository;

    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    // Traemos todas las marcas
    public List<Marca> listarMarcas() {
        return marcaRepository.findAll();
    }
}