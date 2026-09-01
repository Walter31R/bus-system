import { useState, useEffect } from "react";
import { getBuses, getBusById, crearBus, actualizarBus, eliminarBus, buscarCombinado } from "../services/BusServices";
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

    // useState: para los filtros combinados
    const [buscarPlaca, setBuscarPlaca] = useState("");
    const [marcaId, setMarcaId] = useState("");
    const [activo, setActivo] = useState("");
    const [marcas, setMarcas] = useState([]);

    const [busEditar, setBusEditar] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        aplicarFiltros(page);
    }, [page]);

    // Carga las marcas al iniciar
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

    // Carga la lista normal de buses
    const cargarBuses = async () => {
        setLoading(true);
        try {
            const data = await getBuses(0, 5);
            setBuses(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

   
    const aplicarFiltros = async (pagina = 0) => {
        setLoading(true);
        try {
            const data = await buscarCombinado(
                { placa: buscarPlaca, marcaId, activo },
                pagina, 5
            );
            setBuses(data.content);
            setTotalPages(data.totalPages);
            if (data.content.length === 0) {
                setErrorBusqueda("No se encontraron buses");
            } else {
                setErrorBusqueda(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Busca por placa y aplica filtros combiandos
    const handleBuscarPorPlaca = () => {
        setPage(0);
        aplicarFiltros(0);
    };

    // Cambia la marca y aplica filtros combinados
    const handleBuscarPorMarca = (id) => {
        setMarcaId(id);
        setPage(0);
        buscarCombinado({ placa: buscarPlaca, marcaId: id, activo }, 0, 5)
            .then(data => {
                setBuses(data.content);
                setTotalPages(data.totalPages);
            });
    };

    // Cambia el estado activo y aplica filtros combinados
    const handleBuscarPorActivo = (valor) => {
        setActivo(valor);
        setPage(0);
        buscarCombinado({ placa: buscarPlaca, marcaId, activo: valor }, 0, 5)
            .then(data => {
                setBuses(data.content);
                setTotalPages(data.totalPages);
            });
    };

    // Limpia todos los filtros y vuelve a la lista normal
    const limpiarFiltros = () => {
        setBuscarPlaca("");
        setMarcaId("");
        setActivo("");
        setPage(0);
        setErrorBusqueda(null);
        cargarBuses();
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
            aplicarFiltros(page);
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

            aplicarFiltros(page);
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

                {/* Filtrar por marca */}
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

                {/* Botón limpiar todos los filtros */}
                {(buscarPlaca || marcaId || activo) && (
                    <button onClick={limpiarFiltros} style={{ color: "red" }}>
                        ✖ Limpiar filtros
                    </button>
                )}

                <button onClick={abrirAgregar} style={{ marginLeft: "auto" }}>
                    ➕ Agregar Bus
                </button>
            </div>

            {/* Muestra el mensaje si no hay resultados */}
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