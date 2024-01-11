// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// Créer un contexte
const ChatContext = createContext();

// Composant Sidebar
const Sidebar = () => {
  // Utiliser useContext pour accéder au contexte
  const chatMessages = useContext(ChatContext);

  return (
    <div className={`sidebar ${chatMessages.length > 0 ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/">
            <img className="menu-icon" src="home.png" alt="" />
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/password genrator">
            <img className="menu-icon" src="lock.png" alt="" />
            Password generator
          </Link>
        </li>
        <li>
          <Link to="/token">
            <img className="menu-icon" src="token.png" alt="" />
            Token
          </Link>
        </li>
        <li>
          <Link to="/cloud">
            <img className="menu-icon" src="cloud-share.png" alt="" />
            Cloud files
          </Link>
        </li>
        <li>
          <Link to="/apis">
            <img className="menu-icon" src="marketing.png" alt="" />
            APIs
          </Link>
        </li>
        <li>
          <Link to="/help">
            <img className="menu-icon" src="settings.png" alt="" />
            Help
          </Link>
        </li>
      </ul>
    </div>
  );
};


// Composant principal App
const App = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Utiliser useEffect pour simuler des mises à jour de chatMessages
  useEffect(() => {
    // Simuler des messages de chat mis à jour
    setChatMessages([
      { author: 'Javis', text: 'Bonjour, comment puis-je vous aider ?' },
    ]);
  }, []);

  function sendMessage() {
    if (!userInput.trim()) {
      console.log("Le champ de saisie est vide. Aucun message envoyé.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: userInput }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Réponse non valide depuis le serveur.");
        }
        return response.json();
      })
      .then(data => {
        setChatMessages(prevMessages => [
          ...prevMessages,
          { author: 'Javis', text: data.response },
        ]);

        setUserInput('');
      })
      .catch(error => {
        console.error("Erreur lors de la requête fetch :", error.message);
      });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ChatContext.Provider value={chatMessages}>
      <div className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar */}
        <Sidebar />

        {/* Contenu principal */}
        <div className="content">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>

          <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="container mt-5">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Javis</h5>
                </div>
                <div className="card-body messages" id="chat-messages">
                  {/* Utiliser useContext pour accéder au contexte */}
                  {useContext(ChatContext).map((message, index) => (
                    <p key={index}>{`${message.author}: ${message.text}`}</p>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="user-input"
                      placeholder="Message to Javis..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={sendMessage}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ChatContext.Provider>
  );
};

export default App;
