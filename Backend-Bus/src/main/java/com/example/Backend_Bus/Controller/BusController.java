package com.example.Backend_Bus.Controller;

import com.example.Backend_Bus.Model.Bus;
import com.example.Backend_Bus.Service.BusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/bus")
public class BusController {
    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public Page<Bus> listar(Pageable pageable) {
        return busService.listarBuses(pageable);
    }

    @GetMapping("/{id}")
    public Bus obtenerBusPorId(@PathVariable Long id) {
        return busService.obtenerBusPorId(id);
    }

    // Registramos nuevo bus
    @PostMapping
    public ResponseEntity<Bus> guardar(@RequestBody Bus bus) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(busService.guardar(bus));
    }

    // Actualizar bus existente
    @PutMapping("/{id}")
    public ResponseEntity<Bus> actualizar(@PathVariable Long id,
                                          @RequestBody Bus bus) {
        return ResponseEntity.ok(busService.actualizar(id, bus));
    }
    //Eliminamos bus
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        busService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
    // Buscar por placa, y marca y actividad
    @GetMapping("/buscar")
    public Page<Bus> buscar(
            @RequestParam(required = false) String placa,
            @RequestParam(required = false) Long marcaId,
            @RequestParam(required = false) Boolean activo,  // ← agrega esto
            Pageable pageable) {
        if (placa != null && !placa.isEmpty()) {
            return busService.buscarPorPlaca(placa, pageable);
        }
        if (marcaId != null) {
            return busService.buscarPorMarca(marcaId, pageable);
        }
        if (activo != null) {                                // ← agrega esto
            return busService.buscarPorActivo(activo, pageable);
        }
        return busService.listarBuses(pageable);
    }
}
