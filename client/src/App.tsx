import { useEffect, useState } from "react";
import api from "./api/api";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");

        setStatus(response.data.status);
      } catch (error) {
        console.error("Backend connection failed:", error);
        setStatus("Backend unavailable");
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <h1>AgentScope</h1>

      <p>AI Agent Observability Platform</p>

      <p>
        Backend status: <strong>{status}</strong>
      </p>
    </div>
  );
}

export default App;