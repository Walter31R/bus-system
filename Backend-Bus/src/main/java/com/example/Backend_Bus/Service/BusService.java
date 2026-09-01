package com.example.Backend_Bus.Service;

import com.example.Backend_Bus.Model.Bus;
import com.example.Backend_Bus.Model.Marca;
import com.example.Backend_Bus.Repository.MarcaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.example.Backend_Bus.Repository.BusRepository;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BusService {

    private final BusRepository busRepository;
    private final MarcaRepository marcaRepository;

    public BusService(BusRepository busRepository,  MarcaRepository marcaRepository) {
        this.busRepository = busRepository;
        this.marcaRepository = marcaRepository;
    }

    public Page<Bus> listarBuses(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Bus obtenerBusPorId(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Bus no encontrado"
                ));
    }

    public Bus guardar(Bus bus) {
        if (busRepository.existsByNumeroBus(bus.getNumeroBus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El número de bus ya existe");
        }
        if (busRepository.existsByPlaca(bus.getPlaca())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La placa ya existe");
        }

        Marca marca = marcaRepository.findById(bus.getMarca().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Marca no encontrada"));
        bus.setMarca(marca);

        return busRepository.save(bus);
    }

    public Bus actualizar(Long id, Bus busActualizado) {
        Bus busExistente = obtenerBusPorId(id);

        if (!busExistente.getNumeroBus().equals(busActualizado.getNumeroBus()) &&
                busRepository.existsByNumeroBus(busActualizado.getNumeroBus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El número de bus ya existe");
        }

        if (!busExistente.getPlaca().equals(busActualizado.getPlaca()) &&
                busRepository.existsByPlaca(busActualizado.getPlaca())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La placa ya existe");
        }

        busExistente.setNumeroBus(busActualizado.getNumeroBus());
        busExistente.setPlaca(busActualizado.getPlaca());
        busExistente.setCaracteristicas(busActualizado.getCaracteristicas());
        busExistente.setActivo(busActualizado.getActivo());

        Marca marca = marcaRepository.findById(busActualizado.getMarca().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Marca no encontrada"));
        busExistente.setMarca(marca);

        return busRepository.save(busExistente);
    }

    public void eliminar(Long id) {
        Bus bus = obtenerBusPorId(id);
        busRepository.delete(bus);
    }

    // Busca buses por placa
    public Page<Bus> buscarPorPlaca(String placa, Pageable pageable) {
        return busRepository.findByPlacaContainingIgnoreCase(placa, pageable);
    }
    //Busca por marca
    public Page<Bus> buscarPorMarca(Long marcaId, Pageable pageable) {
        return busRepository.findByMarcaId(marcaId, pageable);
    }
    // Filtra buses por estado activo o inactivo
    public Page<Bus> buscarPorActivo(Boolean activo, Pageable pageable) {
        return busRepository.findByActivo(activo, pageable);
    }
}