function sendMessage() {
    var userInput = document.getElementById("user-input").value;

    fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        var chatMessages = document.getElementById("chat-messages");
        var message = document.createElement("p");
        message.textContent = "Javis: " + data.response;
        chatMessages.appendChild(message);
    });
}
