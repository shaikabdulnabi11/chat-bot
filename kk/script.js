// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const addButton = document.getElementById('add-button');
const emojiButton = document.getElementById('emoji-button');
const voiceButton = document.getElementById('voice-button');
const fileInput = document.getElementById('file-input');
const cameraInput = document.getElementById('camera-input');
const settingsToggle = document.getElementById('settings-toggle');
const settingsBar = document.getElementById('settings-bar');
const fontSelect = document.getElementById('font-select');
const themeSelect = document.getElementById('theme-select');
const typingIndicator = document.getElementById('typing-indicator');

// Load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        const messageElement = createMessageElement(message.text, message.sender, message.timestamp);
        chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Save message to local storage
function saveMessage(text, sender) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push({ text, sender, timestamp: new Date().toLocaleTimeString() });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Create message element
function createMessageElement(text, sender, timestamp) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;

    const timestampElement = document.createElement('span');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = timestamp;
    messageElement.appendChild(timestampElement);

    const reactionsElement = document.createElement('div');
    reactionsElement.classList.add('reactions');
    reactionsElement.innerHTML = `<span>👍</span><span>❤️</span>`;
    messageElement.appendChild(reactionsElement);

    return messageElement;
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        const messageElement = createMessageElement(text, 'user', new Date().toLocaleTimeString());
        chatMessages.appendChild(messageElement);
        saveMessage(text, 'user');
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        simulateBotResponse(text);
    }
}

// Simulate bot response
function simulateBotResponse(text) {
    typingIndicator.style.display = 'block';
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        const responses = {
            "hello": "Hi there! How can I help you?",
            "how are you": "I'm just a bot, but I'm doing great!",
            "what's your name": "I'm your friendly chatbot!",
            "default": "I'm sorry, I didn't understand that."
        };
        const response = responses[text.toLowerCase()] || responses['default'];
        const messageElement = createMessageElement(response, 'bot', new Date().toLocaleTimeString());
        chatMessages.appendChild(messageElement);
        saveMessage(response, 'bot');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

// Add button functionality
addButton.addEventListener('click', () => {
    const action = prompt("Choose an action:\n1. Send Document\n2. Take Photo");
    if (action === "1") {
        fileInput.click();
    } else if (action === "2") {
        cameraInput.click();
    }
});

// File upload
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const messageElement = createMessageElement(`File uploaded: ${file.name}`, 'user', new Date().toLocaleTimeString());
        chatMessages.appendChild(messageElement);
        saveMessage(`File uploaded: ${file.name}`, 'user');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Camera capture
cameraInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const messageElement = createMessageElement(`Photo taken: ${file.name}`, 'user', new Date().toLocaleTimeString());
        chatMessages.appendChild(messageElement);
        saveMessage(`Photo taken: ${file.name}`, 'user');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Settings toggle
settingsToggle.addEventListener('click', () => {
    settingsBar.style.display = settingsBar.style.display === 'block' ? 'none' : 'block';
});

// Change font
fontSelect.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});

// Change theme
themeSelect.addEventListener('change', (e) => {
    document.body.className = e.target.value + '-theme';
});

// Load messages on page load
loadMessages();

// Send message on button click or Enter key
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});