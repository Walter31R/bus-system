const BASE_URL = "http://localhost:8080";


export const login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error("Credenciales inválidas");
    const data = await response.json();

    localStorage.setItem("token", data.token);
    return data.token;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};