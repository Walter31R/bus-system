package com.example.Backend_Bus.Repository;

import com.example.Backend_Bus.Model.Bus;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

@Repository
public interface BusSpecification {

    // Filtra por placa
    public static Specification<Bus> tienePlaca(String placa) {
        return (root, query, cb) ->
                placa == null || placa.isEmpty() ? null :
                        cb.like(cb.lower(root.get("placa")), "%" + placa.toLowerCase() + "%");
    }

    // Filtra por marca
    public static Specification<Bus> tieneMarca(Long marcaId) {
        return (root, query, cb) ->
                marcaId == null ? null :
                        cb.equal(root.get("marca").get("id"), marcaId);
    }

    // Filtra por activo
    public static Specification<Bus> tieneActivo(Boolean activo) {
        return (root, query, cb) ->
                activo == null ? null :
                        cb.equal(root.get("activo"), activo);
    }
}
