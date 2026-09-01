import { useState, useEffect } from "react";
import { getMarcas } from "../services/marcaServices";

function BusForm({ busEditar, onGuardar, onCerrar }) {

    // useState: para guardar las marcas para el dropdown(lista despegable)
    const [marcas, setMarcas] = useState([]);

    // useState: para guardar los datos del formulario
    const [form, setForm] = useState({
        numeroBus: "",
        placa: "",
        caracteristicas: "",
        activo: true,
        marca: { id: "" }
    });

    const [error, setError] = useState(null);

    // Carga los datos del formulario para actualizarlo
    useEffect(() => {
        if (busEditar) {
            setForm({
                numeroBus: busEditar.numeroBus,
                placa: busEditar.placa,
                caracteristicas: busEditar.caracteristicas,
                activo: busEditar.activo,
                marca: { id: busEditar.marca.id }
            });
        }
    }, [busEditar]);

    // Carga todas las marcas al abrir el formulario
    useEffect(() => {
        const cargarMarcas = async () => {
            try {
                const data = await getMarcas();
                setMarcas(data);
            } catch (err) {
                setError("Error al cargar marcas");
            }
        };
        cargarMarcas();
    }, []);

    // Actualiza el campo que el usuario haya modificado
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "marca") {
            setForm({ ...form, marca: { id: value } });
        } else if (name === "activo") {
            setForm({ ...form, activo: value === "true" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async () => {
    if (!form.numeroBus || !form.placa || !form.marca.id) {
        setError("Número, placa y marca son obligatorios");
        return;
    }
    setError(null);
    try {
        await onGuardar(form);
    } catch (e) {
        // Mensaje de error
        setError(e.message);
    }
};

    const inputStyle = {
        display: "block",
        width: "100%",
        padding: "9px 12px",
        marginTop: "5px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: "#f9fafb",
        color: "#111827",         
        caretColor: "#111827"      
    };

    const labelStyle = {
        fontSize: "13px",
        fontWeight: "600",
        color: "#374151"
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "12px",
                width: "420px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
                <div style={{ borderBottom: "2px solid #f0f0f0", paddingBottom: "12px", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, fontSize: "20px", color: "#1f2937" }}>
                        {busEditar ? "✏️ Editar Bus" : "➕ Agregar Bus"}
                    </h2>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: "#fef2f2", border: "1px solid #fca5a5",
                        borderRadius: "6px", padding: "10px",
                        color: "#dc2626", fontSize: "13px", marginBottom: "16px"
                    }}>
                        ❌ {error}
                    </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Número de Bus</label>
                        <input
                            name="numeroBus"
                            value={form.numeroBus}
                            onChange={handleChange}
                            placeholder="BUS-001"
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Placa</label>
                        <input
                            name="placa"
                            value={form.placa}
                            onChange={handleChange}
                            placeholder="ABC-123"
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                    <label style={labelStyle}>Características</label>
                    <textarea
                        name="caracteristicas"
                        value={form.caracteristicas}
                        onChange={handleChange}
                        placeholder="Asientos 180º, WiFi, GPS..."
                        rows={3}
                        style={{ ...inputStyle, resize: "none" }}
                    />
                </div>

                <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ flex: 1 }}>
                        {/* Lista de marcas que vienen del backend */}
                        <label style={labelStyle}>Marca</label>
                        <select
                            name="marca"
                            value={form.marca.id}
                            onChange={handleChange}
                            style={inputStyle}>
                            <option value="">Selecciona una marca</option>
                            {marcas.map((m) => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Estado</label>
                        <select
                            name="activo"
                            value={form.activo}
                            onChange={handleChange}
                            style={inputStyle}>
                            <option value="true">✅ Activo</option>
                            <option value="false">❌ Inactivo</option>
                        </select>
                    </div>
                </div>

                {/* Botones */}
                <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            flex: 1, padding: "10px",
                            backgroundColor: "#1f2937", color: "white",
                            border: "none", borderRadius: "6px",
                            fontSize: "14px", fontWeight: "600", cursor: "pointer"
                        }}>
                        💾 Guardar
                    </button>
                    <button
                        onClick={onCerrar}
                        style={{
                            flex: 1, padding: "10px",
                            backgroundColor: "#f3f4f6", color: "#374151",
                            border: "1px solid #d1d5db", borderRadius: "6px",
                            fontSize: "14px", fontWeight: "600", cursor: "pointer"
                        }}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BusForm;