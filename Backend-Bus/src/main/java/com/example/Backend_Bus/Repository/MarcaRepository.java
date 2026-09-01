package com.example.Backend_Bus.Repository;

import com.example.Backend_Bus.Model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository <Marca, Long> {
}
