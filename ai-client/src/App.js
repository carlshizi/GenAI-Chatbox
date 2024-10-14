import './App.css';
import './normal.css';
import { useState } from 'react';

import AddCircleIcon from './assets/add_circle_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import sendIcon from './assets/send_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import logo from './assets/Asset1.png';

function App() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // alert('Message sent!');
      setMessage(''); // Clear the text area after sending the message
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="App">
      {/* Left side menu */}
      <aside className="sidemenu-section">
        <img src={logo} alt="FreeAI Logo" className="logo" />
        <h1>FreeAI</h1>
        <div className="sidemenu-button">
          <img src={AddCircleIcon} alt="New Chat Icon" className="icon" />
          <span className="text">New Chat</span>
        </div>
      </aside>

      {/* Right side chatbox */}
      <section className="chatbox-section">
        <div className="chat-input">
          <div className="oval-shape">
            {/* Text Input */}
            <textArea
              rows="1"
              className="chat-textArea"
              placeholder="Ask me a question..."
              value={message}
              onChange={handleInputChange}
            />

            {/* Button */}
            <section className="button-section">
              <img
                src={sendIcon}
                alt="Send Icon"
                className={`sendIcon ${!message.trim() ? 'inactive' : ''}`} 
                onClick={message.trim() ? sendMessage : null}
              />
            </section>
          </div>
          
        </div>
      </section>
      


    </div>
  );
}

export default App;
