function BusDetail({ bus, onCerrar }) {
    return (
        <div style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000 
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                minWidth: "300px",
                color: "black",       
                textAlign: "left"   
            }}>
                <h2 style={{ color: "black", marginTop: 0 }}>🚌 Detalle del Bus</h2>
                
                <div style={{ color: "#000" }}> 
                    <p><b>ID:</b> {bus.id}</p>
                    <p><b>Número:</b> {bus.numeroBus}</p>
                    <p><b>Placa:</b> {bus.placa}</p>
                    <p><b>Marca:</b> {bus.marca?.nombre}</p>
                    <p><b>Características:</b> {bus.caracteristicas}</p>
                    <p><b>Fecha creación:</b> {bus.fechaCreacion}</p>
                    <p><b>Activo:</b> {bus.activo ? "✅ Sí" : "❌ No"}</p>
                </div>

                <button
                    onClick={onCerrar}
                    style={{ 
                        marginTop: "15px",
                        padding: "8px 15px",
                        cursor: "pointer",
                        backgroundColor: "#333", 
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default BusDetail;