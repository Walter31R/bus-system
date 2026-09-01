import { getToken } from "./AuthServices";

const BASE_URL = "http://localhost:8080";

const authHeader = () => ({
    "Authorization": `Bearer ${getToken()}`
});

const authHeaderJson = () => ({
    "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
});

export const getBuses = async (page = 0, size = 5) => {
    const response = await fetch(
        `${BASE_URL}/bus?page=${page}&size=${size}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Error al obtener buses");
    return response.json();
};

export const getBusById = async (id) => {
    const response = await fetch(
        `${BASE_URL}/bus/${id}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Bus no encontrado");
    return response.json();
};
// GET /bus/buscar?placa=ABC para buscar por placa 
export const buscarPorPlaca = async (placa, page = 0, size = 5) => {
    const response = await fetch(
        `${BASE_URL}/bus/buscar?placa=${placa}&page=${page}&size=${size}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Error al buscar buses");
    return response.json();
};
// GET /bus/buscar?marcaId=1 → para busca buses por marca
export const buscarPorMarca = async (marcaId, page = 0, size = 5) => {
    const response = await fetch(
        `${BASE_URL}/bus/buscar?marcaId=${marcaId}&page=${page}&size=${size}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Error al buscar por marca");
    return response.json();
};
// POST /bus para registrar un nuevo bus
export const crearBus = async (bus) => {
    const response = await fetch(`${BASE_URL}/bus`, {
        method: "POST",
        headers: authHeaderJson(),
        body: JSON.stringify(bus)
    });

    if (!response.ok) {
        const texto = await response.text();
        console.log("TEXTO ERROR:", texto);

        let mensajeError = "Error al crear bus";
        try {
            const data = JSON.parse(texto);
            // Spring Boot con ResponseStatusException guarda el mensaje en 'message' o 'detail'
            mensajeError = data.message || data.detail || mensajeError;
        } catch {
            if (texto) mensajeError = texto;
        }

        throw new Error(mensajeError);
    }
    return response.json();
};

// PUT /bus/{id} para actualizar un bus existente
export const actualizarBus = async (id, bus) => {
    const response = await fetch(`${BASE_URL}/bus/${id}`, {
        method: "PUT",
        headers: authHeaderJson(),
        body: JSON.stringify(bus)
    });

    if (!response.ok) {
        const texto = await response.text();

        let mensajeError = "Error al actualizar bus";
        try {
            const data = JSON.parse(texto);
            mensajeError = data.message || data.detail || mensajeError;
        } catch {
            if (texto) mensajeError = texto;
        }

        throw new Error(mensajeError);
    }
    return response.json();
};
// GET /bus/buscar?activo=true/false → busca por estado
export const buscarPorActivo = async (activo, page = 0, size = 5) => {
    const response = await fetch(
        `${BASE_URL}/bus/buscar?activo=${activo}&page=${page}&size=${size}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Error al buscar por estado");
    return response.json();
};
// DELETE /bus/{id} para eliminar un bus
export const eliminarBus = async (id) => {
    const response = await fetch(`${BASE_URL}/bus/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (!response.ok) throw new Error("Error al eliminar bus");
};