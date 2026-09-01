package com.example.Backend_Bus.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bus")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_bus", nullable = false, unique = true)
    private String numeroBus;

    @Column(nullable = false, unique = true)
    private String placa;

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column
    private String caracteristicas;

    @Column(nullable = false)
    private Boolean activo;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;


}
