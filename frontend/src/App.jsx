import { useState } from "react";

async function getHealth() {
    const response = await fetch("/api/health");

    if (!response.ok) {
        throw new Error("No fue posible conectar con el backend.");
    }

    return await response.json();
}

function StatusCard({ health }) {

    if (!health) {

        return <p>Sin información.</p>;

    }

    return (

        <div>

            <h2>Backend conectado</h2>

            <p><strong>Aplicación:</strong> {health?.application ?? "Sin infor"}</p>

            <p><strong>Versión:</strong> {health?.version ?? "Sin infor"}</p>

            <p><strong>Estado:</strong> {health?.status ?? "Sin infor"}</p>

        </div>

    );

}

function App() {

    const [health, setHealth] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function testConnection() {

        try {

            setLoading(true);

            setError("");

            const data = await getHealth();

            setHealth(data);

        } catch {

            setError("No fue posible conectar con el backend.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <main>

            <h1>🚀 Homelab Demo</h1>

            <button onClick={testConnection}>

                {loading ? "Conectando..." : "Probar conexión"}

            </button>

            {error && <p>{error}</p>}

            <StatusCard health={health} />

        </main>

    );

}

export default App
