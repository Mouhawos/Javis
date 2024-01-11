import React, { useState, useEffect } from 'react';
import './APIs.css';

const Sidebar = ({ isOpen }) => (
  <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <ul>
      <li><img src="home.png" alt="Home" /> Accueil</li>
      <li><img src="lock.png" alt="Password generator" /> Password generator</li>
      <li><img src="token.png" alt="Token" /> Token</li>
      <li><img src="cloud-share.png" alt="" /> Cloud files</li>
      <li><img src="API.png" alt="" />APIs</li>
      <li><img src="settings.png" alt="Help" /> Help</li>
    </ul>
  </div>
);

const Dashboard = ({ isOpen, toggleSidebar }) => {
  const [data, setData] = useState([]);
  const [apiUrl, setApiUrl] = useState('https://api-cybersecurity.example.com/data');
  const [apiKey, setApiKey] = useState('');
  const [numberOfRequests, setNumberOfRequests] = useState(5);
  const [apiKeys, setApiKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    Array.from({ length: numberOfRequests }).forEach(() => fetchData());
  }, [apiUrl, apiKey, numberOfRequests]);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
  };

  const handleNumberOfRequestsChange = (event) => {
    setNumberOfRequests(parseInt(event.target.value, 10));
  };

  const generateApiKey = () => {
    const newApiKey = Math.random().toString(36).substring(7);
    setApiKeys([...apiKeys, newApiKey]);
  };

  const revokeApiKey = (keyToRevoke) => {
    const updatedKeys = apiKeys.filter(key => key !== keyToRevoke);
    setApiKeys(updatedKeys);
  };

  return (
    <div className={`dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <h1>Tableau de bord de cybersécurité</h1>
      
      <div className="config-options">
        <label htmlFor="apiUrl">URL de l'API :</label>
        <input type="text" id="apiUrl" value={apiUrl} onChange={handleApiUrlChange} />

        <label htmlFor="apiKey">Code secret :</label>
        <input type="text" id="apiKey" value={apiKey} onChange={handleApiKeyChange} />

        <label htmlFor="numberOfRequests">Nombre de requêtes :</label>
        <input type="number" id="numberOfRequests" value={numberOfRequests} onChange={handleNumberOfRequestsChange} />
      </div>

      <div className="api-key-management">
        <h2>Gestion des Clés API</h2>
        <button onClick={generateApiKey}>Générer une Nouvelle Clé API</button>
        <ul>
          {apiKeys.map((key, index) => (
            <li key={index}>
              {key} <button onClick={() => revokeApiKey(key)}>Révoquer</button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="dashboard-list">
        {data.map(item => (
          <li key={item.id} className="dashboard-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <Sidebar isOpen={sidebarOpen} />
      <div className="content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <Dashboard isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default App;
