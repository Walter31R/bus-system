import { useState } from "react";
import { login } from "../services/AuthServices";

function Login({ onLoginExitoso }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) return;
        setLoading(true);
        setError(null);
        try {
            await login(username, password);

            onLoginExitoso();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", height: "100vh"
        }}>
            <div style={{
                padding: "40px", border: "1px solid #ccc",
                borderRadius: "10px", minWidth: "300px"
            }}>
                <h2>🔐 Iniciar Sesión</h2>

                <div style={{ marginBottom: "15px" }}>
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                {error && <p style={{ color: "red" }}>❌ {error}</p>}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{ width: "100%", 
                    padding: "10px", 
                    marginTop: "10px" }}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </div>
        </div>
    );
}

export default Login;