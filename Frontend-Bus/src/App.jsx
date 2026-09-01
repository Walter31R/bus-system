import { useState } from "react";
import { getToken } from "./services/AuthServices";
import Login from "./pages/Login";
import BusList from "./pages/BusList";

function App() {
    const [logueado, setLogueado] = useState(!!getToken());


    return logueado
        ? <BusList onLogout={() => setLogueado(false)} />
        : <Login onLoginExitoso={() => setLogueado(true)} />;
    
    }

export default App;