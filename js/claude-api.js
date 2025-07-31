const baseURL = "https://georgian.polaristechservices.com";
// IMPORTANT: Never commit API keys to version control.
// For development: Use a config file or environment variable.
// For production: Use environment variables or secure key management.

// Load API key from apiKey.js file.
const studentApiKey = window.apiConfig ? window.apiConfig.studentApiKey : "";

// Public API settings (safe to share).
const maxTokens = 300;
const MODEL = "claude-3-opus-20240229"; // Most capable Claude model.

// Get API key from sessionStorage if available.
const getApiKey = () => {
    return sessionStorage.getItem('studentApiKey') || studentApiKey;
};

// Show API key modal.
function showApiKeyModal() {
    if (apiKeyModal) {
        apiKeyModal.classList.add('show');
        apiKeyInput.focus();
    }
}

// Hide API key modal.
function hideApiKeyModal() {
    if (apiKeyModal) {
        apiKeyModal.classList.remove('show');
    }
}

// Handle API key form submission.
function handleApiKeySubmit(event) {
    event.preventDefault();
    
    const userApiKey = apiKeyInput.value.trim();
    
    if (userApiKey) {
        // Store in sessionStorage for the current session.
        sessionStorage.setItem('studentApiKey', userApiKey);
        
        // Hide the modal.
        hideApiKeyModal();
        
        // Clear the input.
        apiKeyInput.value = '';
        
        // Initialize the chat system.
        initializeFirstChat();
        
        // Show success message.
        results.innerHTML = '<div class="success-message"><p>✅ API Key saved! You can now start chatting with Claude.</p></div>';
    } else {
        // Show error if no key entered.
        apiKeyInput.style.borderColor = '#dc3545';
        apiKeyInput.placeholder = 'Please enter your student ID';
    }
}

// Logout function - clear API key and reset application.
function logout() {
    // Clear the API key from sessionStorage.
    sessionStorage.removeItem('studentApiKey');
    
    // Clear all chats.
    chats = {};
    currentChatId = null;
    chatCounter = 0;
    
    // Clear the results area.
    results.innerHTML = '';
    
    // Show the API key modal again.
    showApiKeyModal();
}

let chats = {};
let currentChatId = null;
let chatCounter = 0;

// Initialize the first chat.
function initializeFirstChat() {
    const chatId = `chat_${Date.now()}`;
    chats[chatId] = {
        id: chatId,
        name: "New Chat",
        messages: [],
        createdAt: new Date().toISOString()
    };
    currentChatId = chatId;
    chatCounter++;
    updateChatList();
    displayConversation();
}

// Chat management functions.
function createNewChat() {
    const chatId = `chat_${Date.now()}`;
    chats[chatId] = {
        id: chatId,
        name: "New Chat",
        messages: [],
        createdAt: new Date().toISOString()
    };
    currentChatId = chatId;
    chatCounter++;
    updateChatList();
    displayConversation();
    userMessage.focus();
}

function switchChat(chatId) {
    currentChatId = chatId;
    updateChatList();
    displayConversation();
    userMessage.focus();
}

function deleteChat(chatId, event) {
    event.stopPropagation(); // Prevent switching to the chat being deleted.
    
    if (Object.keys(chats).length === 1) {
        // Don't delete the last chat, just clear it.
        chats[chatId].messages = [];
        displayConversation();
        return;
    }
    
    delete chats[chatId];
    
    if (currentChatId === chatId) {
        // Switch to the first available chat.
        const firstChatId = Object.keys(chats)[0];
        currentChatId = firstChatId;
    }
    
    updateChatList();
    displayConversation();
}

function updateChatList() {
    chatList.innerHTML = '';
    
    Object.values(chats).forEach(chat => {
        const isActive = chat.id === currentChatId;
        const lastMessage = chat.messages.length > 0 ? 
            chat.messages[chat.messages.length - 1].content.substring(0, 30) + '...' : 
            'No messages yet';
        
        const chatElement = document.createElement('div');
        chatElement.className = `chat-item ${isActive ? 'active' : ''}`;
        chatElement.onclick = () => switchChat(chat.id);
        
        chatElement.innerHTML = `
            <div class="chat-item-content">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${lastMessage}</div>
            </div>
            <button class="delete-chat" onclick="deleteChat('${chat.id}', event)">×</button>
        `;
        
        chatList.appendChild(chatElement);
    });
}

function updateChatName(chatId, newName) {
    if (chats[chatId]) {
        chats[chatId].name = newName;
        updateChatList();
    }
}

const userMessage = document.querySelector("#user-message");
const sendMessageBtn = document.querySelector("#send-message");
const checkUsageBtn = document.querySelector("#check-usage");
const clearConversationBtn = document.querySelector("#clear-conversation");
const newChatBtn = document.querySelector("#new-chat");
const chatList = document.querySelector("#chat-list");
const results = document.querySelector("#results");

// API Key Modal elements.
const apiKeyModal = document.querySelector("#api-key-modal");
const apiKeyForm = document.querySelector("#api-key-form");
const apiKeyInput = document.querySelector("#api-key-input");
const submitApiKeyBtn = document.querySelector("#submit-api-key");

// Logout button.
const logoutBtn = document.querySelector("#logout-btn");

sendMessageBtn.addEventListener("click", sendChatMessage);

checkUsageBtn.addEventListener("click", checkTokenUsage);

clearConversationBtn.addEventListener("click", clearConversation);

newChatBtn.addEventListener("click", createNewChat);

// Initialize the first chat when the page loads.
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for API key modal.
    if (apiKeyForm) {
        apiKeyForm.addEventListener('submit', handleApiKeySubmit);
    }
    
    if (apiKeyModal) {
        apiKeyModal.addEventListener('click', (event) => {
            if (event.target === apiKeyModal) {
                hideApiKeyModal();
            }
        });
    }
    
    // Add logout button event listener.
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Check if we have an API key and handle accordingly.
    if (getApiKey()) {
        initializeFirstChat();
    } else {
        showApiKeyModal();
    }
});


function checkTokenUsage() {
    const url = `${baseURL}/api/claude/status`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Student-API-Key': getApiKey()
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        
        const usageInfo = `
            <div class="usage-info">
                <h3>Token Usage Status</h3>
                <p><strong>Student ID:</strong> ${data.student_id}</p>
                <p><strong>Student Name:</strong> ${data.student_name}</p>
                <p><strong>Tokens Used:</strong> ${data.tokens_used}</p>
                <p><strong>Tokens Allocated:</strong> ${data.tokens_allocated}</p>
                <p><strong>Tokens Remaining:</strong> ${data.tokens_remaining}</p>
                <p><strong>Account Status:</strong> ${data.is_enabled ? 'Enabled' : 'Disabled'}</p>
            </div>
        `;
        results.innerHTML = usageInfo;
    })
    .catch(error => {
        results.innerHTML = `<p class="error">Error checking token usage: ${error.message}</p>`;
    });
}

// Enhanced sendChatMessage function with conversation history.
function sendChatMessage() {
    if (!currentChatId || !chats[currentChatId]) {
        createNewChat();
        return;
    }
    
    const message = userMessage.value.trim();
    
    if (!message) {
        results.innerHTML = '<p class="error">Please enter a message to send to Claude.</p>';
        return;
    }

    // Add user message to current chat's conversation history.
    chats[currentChatId].messages.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString()
    });

    // Update chat name based on first message.
    if (chats[currentChatId].messages.length === 1) {
        const newName = message.length > 20 ? message.substring(0, 20) + '...' : message;
        updateChatName(currentChatId, newName);
    }

    // Display the updated conversation immediately.
    displayConversation();

    // Clear the input field.
    userMessage.value = '';

    // Show loading indicator.
    showLoadingIndicator();

    const url = `${baseURL}/api/claude/messages`;

    // Prepare the request body with full conversation context from current chat.
    const requestBody = {
        model: MODEL, // Use the specified model.
        max_tokens: maxTokens,
        messages: chats[currentChatId].messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }))
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'X-Student-API-Key': getApiKey(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        
        if (data.content && data.content.length > 0) {
            const claudeResponse = data.content[0].text;
            const usage = data.usage;
            
            // Add Claude's response to current chat's conversation history.
            chats[currentChatId].messages.push({
                role: "assistant",
                content: claudeResponse,
                timestamp: new Date().toISOString()
            });
            
            // Display the updated conversation with Claude's response.
            displayConversation(usage);
        } else {
            results.innerHTML = '<p class="error">No response content received from Claude.</p>';
        }
    })
    .catch(error => {
        results.innerHTML = `<p class="error">Error sending message to Claude: ${error.message}</p>`;
    });
}

// Function to display the conversation in a chat-like format.
function displayConversation(usage = null) {
    let conversationHTML = '<div class="chat-container">';
    
    if (!currentChatId || !chats[currentChatId]) {
        conversationHTML += '<div class="welcome-message"><p>No chat selected. Click "New Chat" to start a conversation!</p></div>';
    } else if (chats[currentChatId].messages.length === 0) {
        conversationHTML += '<div class="welcome-message"><p>Welcome! Start a conversation with Claude by typing a message below.</p></div>';
    } else {
        chats[currentChatId].messages.forEach((message, index) => {
            const isUser = message.role === 'user';
            const messageClass = isUser ? 'user-message' : 'assistant-message';
            const senderName = isUser ? 'You' : 'Claude';
            const avatar = isUser ? '👤' : '🤖';
            
            // Format timestamp.
            const timestamp = new Date(message.timestamp).toLocaleTimeString();
            
            conversationHTML += `
                <div class="message-wrapper ${messageClass}">
                    <div class="message-header">
                        <span class="avatar">${avatar}</span>
                        <span class="sender">${senderName}</span>
                        <span class="timestamp">${timestamp}</span>
                    </div>
                    <div class="message-content">
                        <p>${message.content}</p>
                    </div>
                    <div class="message-footer">
                        <span class="message-number">#${index + 1}</span>
                    </div>
                </div>
            `;
        });
    }
    
    // Add usage statistics if provided.
    if (usage) {
        conversationHTML += `
            <div class="usage-stats">
                <p><strong>Input Tokens:</strong> ${usage.input_tokens} | <strong>Output Tokens:</strong> ${usage.output_tokens} | <strong>Total Messages:</strong> ${chats[currentChatId] ? chats[currentChatId].messages.length : 0}</p>
            </div>
        `;
    }
    
    conversationHTML += '</div>';
    results.innerHTML = conversationHTML;
    
    // Scroll to the bottom of the conversation.
    results.scrollTop = results.scrollHeight;
}

// Loading indicator function.
function showLoadingIndicator() {
    const loadingHTML = `
        <div class="loading-indicator">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p>Claude is thinking...</p>
        </div>
    `;
    results.innerHTML += loadingHTML;
    results.scrollTop = results.scrollHeight;
}

// Function to clear the conversation history.
function clearConversation() {
    if (currentChatId && chats[currentChatId]) {
        chats[currentChatId].messages = [];
    }
    displayConversation();
}


