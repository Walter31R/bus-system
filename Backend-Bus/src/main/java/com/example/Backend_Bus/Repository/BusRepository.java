package com.example.Backend_Bus.Repository;

import com.example.Backend_Bus.Model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long>,
        JpaSpecificationExecutor<Bus> {
    boolean existsByNumeroBus(String numeroBus);
    boolean existsByPlaca(String placa);
}