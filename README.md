# Claude AI Chat Application

A modern, interactive chat interface for communicating with Claude AI through the Georgian College API. Built with vanilla JavaScript, HTML, and CSS.

## 🚀 Features

- **Multi-Chat Support**: Create, switch between, and manage multiple conversation threads
- **Conversation History**: Maintains full context of conversations for coherent responses
- **Real-time Chat Interface**: Modern chat-like UI with distinct styling for user and AI messages
- **Secure API Key Management**: Modal-based API key input with session storage
- **Token Usage Tracking**: Monitor your API usage and remaining tokens
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading Indicators**: Visual feedback during AI response generation

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: Claude AI via Georgian College API endpoints
- **Storage**: Session Storage for API key management
- **Styling**: Custom CSS with modern design patterns

## 📋 Prerequisites

- A valid Student API Key (Student ID) from Georgian College
- Modern web browser with JavaScript enabled
- Internet connection for API communication

## 🚀 Quick Start

### Option 1: Live Demo
1. Visit the deployed application
2. Enter your Student API Key when prompted
3. Start chatting with Claude!

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/IAmAydinArda/claude-api-chat-interface
   cd claude-api-chat-interface
   ```

2. **Open the application**
   - Open `index.html` in your web browser

3. **Enter your API Key**
   - When the application loads, you'll be asked for Student API Key or you can enter it via Logout button anytime
   - Enter your student ID (e.g., 153243854)
   - Click "Start Chatting"

## 🎯 How to Use

### Starting a Conversation
1. **Enter your message** in the text area at the bottom
2. **Click "Send"** or press Enter to send your message
3. **Wait for Claude's response** - you'll see a loading indicator
4. **Continue the conversation** - Claude maintains context of your entire chat

### Managing Multiple Chats
- **Create New Chat**: Click "Add New Chat" in the sidebar
- **Switch Between Chats**: Click on any chat in the sidebar
- **Delete Chats**: Click the "×" button next to any chat (except the last one)
- **Clear Conversation**: Click "Clear Conversation" to reset the current chat

### Checking API Usage
- Click "Check Usage" to see your token consumption and account status
- View input/output tokens for each response
- Monitor your remaining token allocation

### Logging Out
- Click "Logout" to clear your API key and start fresh
- Useful for testing or switching between different accounts

## 🔧 API Configuration

The application uses the following API endpoints:

- **Base URL**: `https://georgian.polaristechservices.com`
- **Model**: `claude-3-opus-20240229` (Most capable Claude model)
- **Max Tokens**: 300 per response
- **Endpoints**:
  - `GET /api/claude/status` - Check token usage
  - `POST /api/claude/messages` - Send messages to Claude

## 🎨 UI Features

### Chat Interface
- **User Messages**: Right-aligned with blue styling and user avatar
- **AI Responses**: Left-aligned with gray styling and Claude avatar
- **Timestamps**: Each message shows when it was sent
- **Message Numbers**: Sequential numbering for easy reference

### Sidebar
- **Chat Management**: List of all conversations with previews
- **Active Chat Highlighting**: Current chat is visually distinguished
- **Quick Actions**: New chat and logout buttons

### Responsive Design
- **Desktop**: Full sidebar and main content layout
- **Mobile**: Collapsible sidebar for better mobile experience
- **Flexible**: Adapts to different screen sizes

## 🔒 Security Features

- **No Hardcoded Keys**: API keys are never stored in the source code
- **Session Storage**: Keys are stored temporarily in browser session
- **Modal Input**: Secure input method for API key entry
- **Automatic Cleanup**: Keys are cleared on logout

## 📁 Project Structure

```
claude-api-chat-interface/
├── index.html          # Main HTML file
├── css/
│   ├── normalize.css   # CSS reset
│   └── styles.css      # Main stylesheet
├── js/
│   └── claude-api.js   # Main JavaScript application
└── README.md           # This file
```

## 🐛 Troubleshooting

### Common Issues

**"Error checking token usage"**
- Verify your Student API Key is correct
- Check your internet connection
- Ensure your account is enabled

**"No response content received from Claude"**
- Your message might be too long
- Try rephrasing your question
- Check if you have remaining tokens

**Modal doesn't appear**
- Clear your browser's session storage
- Try opening in an incognito/private window
- Check if JavaScript is enabled

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Ensure you have remaining tokens
4. Try logging out and logging back in

## 🤝 Contributing

This is a project for educational purposes. Feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and modify for your own projects

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Built for Georgian College API integration
- Uses Claude AI for intelligent responses
- Inspired by modern chat applications

---

**Happy Chatting! 🤖💬**
