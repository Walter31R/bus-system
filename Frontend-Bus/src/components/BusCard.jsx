function BusCard({ bus, onEditar, onEliminar }) {
    return (
        <tr>
            <td>{bus.id}</td>
            <td>{bus.numeroBus}</td>
            <td>{bus.placa}</td>
            <td>{bus.marca?.nombre}</td>
            <td>{bus.activo ? "✅ Sí" : "❌ No"}</td>
            <td>
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                    <button onClick={() => onEditar(bus)}>
                        ✏️ Editar
                    </button>
                    <button
                        onClick={() => onEliminar(bus.id)}
                        style={{ color: "red" }}>
                        🗑️ Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default BusCard;