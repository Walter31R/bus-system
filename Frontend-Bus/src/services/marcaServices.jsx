import { getToken } from "./AuthServices";

const BASE_URL = "https://bus-system-production.up.railway.app";
const authHeader = () => ({
    "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
});

// Traemos todas las marcas
export const getMarcas = async () => {
    const response = await fetch(`${BASE_URL}/marca`, {
        headers: authHeader()
    });
    if (!response.ok) throw new Error("Error al obtener marcas");
    return response.json();
};