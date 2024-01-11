import React, { useState } from 'react';
import copy from 'clipboard-copy';
import './App.css'


function App() {
  const [token, setToken] = useState('');

  const generateToken = () => {
    // Logique de génération de token ici (peut varier en fonction de vos besoins)
    const newToken = Math.random().toString(36).substring(2, 15);
    setToken(newToken);
  };

  const copyToClipboard = () => {
    if (token) {
      copy(token);
      alert('Token copié dans le presse-papiers !');
    }
  };

  return (
    <div className="App">
      <h1>Service de Token</h1>
      <button onClick={generateToken}>Générer un Token</button>
      {token && (
        <div>
          <h2>Votre Token:</h2>
          <p>{token}</p>
          <button onClick={copyToClipboard}>Copier dans le presse-papiers</button>
        </div>
      )}
    </div>
  );
}

export default App;