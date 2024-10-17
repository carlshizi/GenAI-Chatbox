import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './normal.css';

import AddCircleIcon from './assets/add_circle_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import sendIcon from './assets/send_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import logo from './assets/Asset1.png';

function formatMessage(content) {
  const codeBlockRegex = /```[\s\S]*?```/g;
  return content.replace(codeBlockRegex, match => {
    const code = match.replace(/```/g, '').trim();
    return `<pre><code>${code}</code></pre>`;
  });
}

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  const chatLogRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  async function sendMessage(message) {
    try {
      const userMessage = { role: "user", content: message };
      setChatLog(prevLog => [...prevLog, { type: 'user', content: message }]);
      setMessage('');

      const updatedHistory = [...conversationHistory, userMessage];

      const response = await fetch('http://localhost:8001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message,
          conversation_history: updatedHistory
        }),
      });
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        aiResponse += chunk;
        setChatLog(prevLog => {
          const newLog = [...prevLog];
          if (newLog[newLog.length - 1].type === 'ai') {
            newLog[newLog.length - 1].content = aiResponse;
          } else {
            newLog.push({ type: 'ai', content: aiResponse });
          }
          return newLog;
        });
      }

      // Update conversation history with AI response
      const aiMessage = { role: "assistant", content: aiResponse };
      setConversationHistory(prevHistory => [...prevHistory, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        sendMessage(message);
      }
    }
  };

  const startNewChat = () => {
    setChatLog([]);
    setConversationHistory([]);
    setMessage('');
  };

  return (
    <div className="App">
      <aside className="sidemenu-section">
        <div className="logo-container">
          <img src={logo} alt="FreeAI Logo" className="logo" />
          <h2>Vision Bot</h2>
        </div>
        <div className="sidemenu-button" onClick={startNewChat}>
          <img src={AddCircleIcon} alt="New Chat Icon" className="icon" />
          <span className="text">Start New Chat</span>
        </div>
      </aside>

      <section className="chatbox-section">
        <div className='chatlog' ref={chatLogRef}>
          {chatLog.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type === 'ai' ? 'AI' : ''}`}>
              {chat.type === 'ai' && <div className='avatar AI'></div>}
              <div className='message' dangerouslySetInnerHTML={{ __html: formatMessage(chat.content) }}></div>
            </div>
          ))}
        </div>
        
        <div className="chat-input">
          <div className="oval-shape">
            <textarea
              rows="1"
              className="chat-textArea"
              placeholder="Ask me a question..."
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />

            <section className="button-section">
              <img
                src={sendIcon}
                alt="Send Icon"
                className={`sendIcon ${!message.trim() ? 'inactive' : ''}`} 
                onClick={() => message.trim() && sendMessage(message)}
              />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
