package com.example.Backend_Bus.Model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "marcas_bus")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column( nullable = false, unique = true)
    private String nombre;
}
