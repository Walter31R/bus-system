import { useState, useEffect } from "react";
import { getBuses, getBusById, crearBus, actualizarBus, eliminarBus, buscarPorPlaca, buscarPorMarca, buscarPorActivo   } from "../services/BusServices";
import { logout } from "../services/AuthServices";
import BusCard from "../components/BusCard";
import BusDetail from "./BusDetail";
import BusForm from "../components/BusForm";
import { getMarcas } from "../services/marcaServices";

function BusList({ onLogout }) {

    const [buses, setBuses] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [busSeleccionado, setBusSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useState: para el buscador por ID
    const [buscarId, setBuscarId] = useState("");
    const [errorBusqueda, setErrorBusqueda] = useState(null);

    // useState: para el buscador por placa 
    const [buscarPlaca, setBuscarPlaca] = useState("");
    const [buscandoPorPlaca, setBuscandoPorPlaca] = useState(false);

    // useState: para el buscador por marca
    const [marcaId, setMarcaId] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [buscandoPorMarca, setBuscandoPorMarca] = useState(false);
    
    // useState: para el buscador por estado
    const [activo, setActivo] = useState("");
    const [buscandoPorActivo, setBuscandoPorActivo] = useState(false);

    const [busEditar, setBusEditar] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);

   useEffect(() => {
    if (buscandoPorMarca) {
        buscarPorMarca(marcaId, page, 5).then(data => {
            setBuses(data.content);
            setTotalPages(data.totalPages);
        });
    } else if (buscandoPorPlaca) {
        buscarPorPlaca(buscarPlaca, page, 5).then(data => {
            setBuses(data.content);
            setTotalPages(data.totalPages);
        });
    } else if (buscandoPorActivo) {
        buscarPorActivo(activo, page, 5).then(data => {
            setBuses(data.content);
            setTotalPages(data.totalPages);
        });
    } else {
        cargarBuses();
    }
    }, [page]);
    // Carga la lista normal de buses
    const cargarBuses = async () => {
        setLoading(true);
        try {
            const data = await getBuses(page, 5);
            setBuses(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Busca buses por placa 
    const handleBuscarPorPlaca = async () => {
        if (!buscarPlaca) {
            // Si borra el texto vuelve a la lista normal
            setBuscandoPorPlaca(false);
            setPage(0);
            cargarBuses();
            return;
        }
        setLoading(true);
        setErrorBusqueda(null);
        setBuscandoPorPlaca(true);
        setPage(0);
        try {
            const data = await buscarPorPlaca(buscarPlaca, page, 5);
            setBuses(data.content);
            setTotalPages(data.totalPages);
            if (data.content.length === 0) {
                setErrorBusqueda("No se encontraron buses con esa placa");
            }
        } catch (err) {
            setErrorBusqueda("Error al buscar por placa");
        } finally {
            setLoading(false);
        }
    };
    //Busca buses por marca 
    useEffect(() => {
    const cargarMarcas = async () => {
        try {
            const data = await getMarcas();
            setMarcas(data);
        } catch (err) {
            console.error("Error al cargar marcas");
        }
    };
    cargarMarcas();
    }, []);

    // Limpia el buscador por placa y vuelve a la lista normal
    const limpiarBusquedaPlaca = () => {
        setBuscarPlaca("");
        setBuscandoPorPlaca(false);
        setPage(0);
        cargarBuses();
    };
    // Filtra la tabla según la marca seleccionada 
    const handleBuscarPorMarca = async (id) => {
    setMarcaId(id);
    if (!id) {
        setBuscandoPorMarca(false);
        cargarBuses();
        return;
    }
    setLoading(true);
    setBuscandoPorMarca(true);
    try {
        const data = await buscarPorMarca(id, 0, 5);
        setBuses(data.content);
        setTotalPages(data.totalPages);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

    // Filtra la tabla según si el bus está activo o inactivo
    const handleBuscarPorActivo = async (valor) => {
    setActivo(valor);
    if (valor === "") {
        setBuscandoPorActivo(false);
        cargarBuses();
        return;
    }
    setLoading(true);
    setBuscandoPorActivo(true);
    setPage(0);
    try {
        const data = await buscarPorActivo(valor, 0, 5);
        setBuses(data.content);
        setTotalPages(data.totalPages);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

    // Busca por ID y muestra en modal
    const buscarPorId = async () => {
        if (!buscarId) return;
        setErrorBusqueda(null);
        try {
            const data = await getBusById(buscarId);
            setBusSeleccionado(data);
        } catch (err) {
            setBusSeleccionado(null);
            setErrorBusqueda("Bus no encontrado");
        }
    };

    const abrirAgregar = () => {
        setBusEditar(null);
        setMostrarForm(true);
    };

    const abrirEditar = (bus) => {
        setBusEditar(bus);
        setMostrarForm(true);
    };

    const handleGuardar = async (form) => {
        try {
            if (busEditar) {
                await actualizarBus(busEditar.id, form);
            } else {
                await crearBus(form);
            }
            setMostrarForm(false);
            setBusEditar(null);
            cargarBuses();
        } catch (e) {
            throw e;
        }
    };

    const cerrarForm = () => {
        setMostrarForm(false);
        setBusEditar(null);
    };

    const cerrarDetalle = () => {
        setBusSeleccionado(null);
        setErrorBusqueda(null);
        setBuscarId("");
    };

    const handleLogout = () => {
        logout();
        onLogout();
    };

    const handleEliminar = async (id) => {
        // Pide la confirmación antes de eliminar
        if (!window.confirm("¿Seguro que deseas eliminar este bus?")) return;
        try {
            await eliminarBus(id);
            // Recarga la lista después de eliminar
            cargarBuses();
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    };

    if (loading) return <p>Cargando buses...</p>;
    if (error)   return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>🚌 Lista de Buses</h1>
                <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
                    Cerrar sesión
                </button>
            </div>

            {/* BUSCADORES */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

                {/* Buscar por ID */}
                <input
                    type="number"
                    placeholder="Buscar por ID..."
                    value={buscarId}
                    onChange={(e) => setBuscarId(e.target.value)}
                    style={{ padding: "8px", width: "160px" }}
                />
                <button onClick={buscarPorId}>🔍 Buscar ID</button>

                {/* Buscar por placa */}
                <input
                    type="text"
                    placeholder="Buscar por placa..."
                    value={buscarPlaca}
                    onChange={(e) => setBuscarPlaca(e.target.value)}
                    style={{ padding: "8px", width: "160px" }}
                />
                <button onClick={handleBuscarPorPlaca}>🔍 Buscar Placa</button>

                {/* Botón limpiar y aparece solo cuando se está buscando por placa */}
                {buscandoPorPlaca && (
                    <button onClick={limpiarBusquedaPlaca} style={{ color: "red" }}>
                        ✖ Limpiar
                    </button>
                )}
                {/* Buscar por marca */}
                 <select
                value={marcaId}
                onChange={(e) => handleBuscarPorMarca(e.target.value)}
                style={{ padding: "8px" }}>
                <option value="">Todas las marcas</option>
                {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
                 ))}
                </select>
                {/* Filtrar por estado activo/inactivo */}
                <select
                value={activo}
                onChange={(e) => handleBuscarPorActivo(e.target.value)}
                style={{ padding: "8px" }}>
                <option value="">Todos los estados</option>
                <option value="true">✅ Activo</option>
                <option value="false">❌ Inactivo</option>
                </select>

                <button onClick={abrirAgregar} style={{ marginLeft: "auto" }}>
                    ➕ Agregar Bus
                </button>
            </div>

            {/* Muestra el mensaje si el bus no existe */}
            {errorBusqueda && (
                <p style={{ color: "red" }}>❌ {errorBusqueda}</p>
            )}

            {/* TABLA */}
            <table border="1" cellPadding="8"
                style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f0f0f0" }}>
                    <tr>
                        <th>ID</th>
                        <th>Número</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <BusCard
                            key={bus.id}
                            bus={bus}
                            onEditar={abrirEditar}
                            onEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>

            {/* PAGINACIÓN */}
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 0}>
                    ← Anterior
                </button>
                <span>Página {page + 1} de {totalPages}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page + 1 === totalPages}>
                    Siguiente →
                </button>
            </div>

            {/* MODAL detalle */}
            {busSeleccionado && (
                <BusDetail bus={busSeleccionado} onCerrar={cerrarDetalle} />
            )}

            {/* MODAL formulario para agregar o editar */}
            {mostrarForm && (
                <BusForm
                    busEditar={busEditar}
                    onGuardar={handleGuardar}
                    onCerrar={cerrarForm}
                />
            )}
        </div>
    );
}

export default BusList;