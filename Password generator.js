const htmlCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionnaire de mots de passe</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #3a3a3a;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .password-manager {
        width: 400px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }

      h2 {
        color: #3498db;
      }

      label {
        display: block;
        margin-bottom: 8px;
        color: #555;
      }

      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 16px;
        box-sizing: border-box;
        border: 1px solid #3498db;
        border-radius: 4px;
        color: #333;
      }

      button {
        background-color: #3498db;
        color: #fff;
        padding: 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }

      .generate-password-button {
        background-color: #2ecc71;
      }
    </style>
  </head>
  <body>

  <div class="password-manager">
    <h2>Gestionnaire de Mots de Passe</h2>
    <form id="passwordForm">
      <label for="username">Nom d'utilisateur :</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" required>

      <label for="passkey">Passkey :</label>
      <input type="password" id="passkey" name="passkey" required>

      <button type="button" onclick="generatePassword()" class="generate-password-button">Générer un mot de passe fort</button>

      <button type="button" onclick="savePassword()">Enregistrer</button>
    </form>
  </div>

  <script>
    function generatePassword() {
      const length = 12; // Longueur du mot de passe
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
      let password = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }

      document.getElementById('password').value = password;
    }

    function savePassword() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const passkey = document.getElementById('passkey').value;

      // Vérifiez la validité de la passkey ici avant de procéder
      if (passkey !== '') {
        // Envoi des données au serveur pour le stockage sécurisé
        alert('Envoi des données au serveur...');
      } else {
        alert('La passkey est obligatoire.');
      }
    }
  </script>

  </body>
  </html>
`;

// Utilise ensuite htmlCode comme bon te semble dans ton application.
