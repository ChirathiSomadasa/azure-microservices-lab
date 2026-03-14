import React, { useState, useEffect } from 'react';
import './App.css';

const GATEWAY_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [health, setHealth]     = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${GATEWAY_URL}/health`);
      const data = await res.json();
      setHealth(data);
      const svcRes  = await fetch(`${GATEWAY_URL}/api/services`);
      const svcData = await svcRes.json();
      setServices(svcData.services || []);
    } catch (e) {
      setError('Cannot reach gateway: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHealth(); }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Azure Microservices Lab</h1>
        <p>Azure Microservices Deployment — SE4010</p>
      </header>

      <main className="main">
        <div className="card">
          <h2>Gateway Health</h2>
          {loading && <p className="loading">Checking...</p>}
          {error   && <p className="error">{error}</p>}
          {health  && !loading && (
            <div className="status-badge ok">
              Status: {health.status} &nbsp;|&nbsp; {health.timestamp}
            </div>
          )}
          <button onClick={fetchHealth} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Status'}
          </button>
        </div>

        <div className="card">
          <h2>Services</h2>
          {services.length === 0 && !loading && <p>No services found.</p>}
          <ul className="service-list">
            {services.map((s, i) => (
              <li key={i} className="service-item">
                <span className="service-name">{s.name}</span>
                <span className={`badge ${s.status === 'running' ? 'ok' : 'err'}`}>
                  {s.status}
                </span>
                <span className="port">Port: {s.port}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
