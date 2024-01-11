import React, { useState } from 'react';
import './Cloud.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive, faDropbox, faMicrosoft } from '@fortawesome/free-brands-svg-icons';


function App() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEncrypt = () => {
    // Logique de chiffrement
    // setEncryptedMessage(encryptFunction(message));
  };

  const handleDecrypt = () => {
    // Logique de déchiffrement
    // setDecryptedMessage(decryptFunction(encryptedMessage));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUploadToCloud = (cloudService) => {
    if (cloudService === 'Google Drive') {
      console.log('Envoi vers Google Drive');
    } else if (cloudService === 'Dropbox') {
      console.log('Envoi vers Dropbox');
    }
    // Ajoutez d'autres services cloud au besoin
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><img src="home.png" alt="Home" /> Accueil</li>
          <li><img src="lock.png" alt="Password generator" /> Password 
          generator</li>
          <li><img src="token.png" alt="Token" /> Token</li>
          <li><img src="cloud-share.png" alt="" /> Cloud files</li>
          <li><img src="API.png" alt="" />APIs</li>
          <li><img src="settings.png" alt="Help" /> Help</li>

          
          {/* Ajoutez d'autres éléments de menu ici */}
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>

        <h1>Generator files encrypt</h1>
        <div className="message-section">
          <textarea
            placeholder=" Enter the file to encrypt "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
        <div className="result-section">
          <div>
            <h2>message encrypt</h2>
            <pre>{encryptedMessage}</pre>
          </div>
          <div>
            <h2>message decrypt</h2>
            <pre>{decryptedMessage}</pre>
          </div>
        </div>
        <div className="cloud-buttons">
          <button onClick={() => handleUploadToCloud('Google Drive')}>
            <FontAwesomeIcon icon={faGoogleDrive} /> Upload to google drive
          </button>
          <button onClick={() => handleUploadToCloud('Dropbox')}>
            <FontAwesomeIcon icon={faDropbox} /> Upload to dropbox
          </button>
        
  {/* Ajoutez d'autres boutons pour d'autres services cloud au besoin */}
</div>
      </div>
    </div>
  );
}

export default App;
