package com.example.Backend_Bus.Repository;

import com.example.Backend_Bus.Model.Bus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRepository extends JpaRepository <Bus, Long> {
    boolean existsByNumeroBus(String numeroBus);
    boolean existsByPlaca(String placa);
    Page<Bus> findByPlacaContainingIgnoreCase(String placa, Pageable pageable);
    Page<Bus> findByMarcaId(Long marcaId, Pageable pageable);
    Page<Bus> findByActivo(Boolean activo, Pageable pageable);
}
