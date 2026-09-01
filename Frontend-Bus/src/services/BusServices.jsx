import { getToken } from "./AuthServices";

const BASE_URL = "https://bus-system-production.up.railway.app";
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

// GET /bus/buscar?placa=ABC&marcaId=1&activo=true, una busqueda combinada 
export const buscarCombinado = async (filtros, page = 0, size = 5) => {
    const params = new URLSearchParams();
    if (filtros.placa)    params.append("placa", filtros.placa);
    if (filtros.marcaId)  params.append("marcaId", filtros.marcaId);
    if (filtros.activo !== "") params.append("activo", filtros.activo);
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
        `${BASE_URL}/bus/buscar?${params.toString()}`,
        { headers: authHeader() }
    );
    if (!response.ok) throw new Error("Error al buscar buses");
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
        let mensajeError = "Error al crear bus";
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

// DELETE /bus/{id} para eliminar un bus
export const eliminarBus = async (id) => {
    const response = await fetch(`${BASE_URL}/bus/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (!response.ok) throw new Error("Error al eliminar bus");
};