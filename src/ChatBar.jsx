import React from 'react';

function ChatBar({clientName, handleMessage, handleNameChange, handleBothChange}) {
  const handleMessageKeyUp = event => {
    const username = event.target.previousElementSibling.value;
    const content = event.target.value;
    if (event.key === 'Enter' && username !== clientName) {
      handleBothChange(username, content);
      event.target.value = '';
    } else if (event.key === 'Enter') {
      handleMessage(content);
      event.target.value = '';
    }
  }

  const handleNameKeyUp = event => {
    const username = event.target.value;
    if (event.key === 'Enter' && username !== clientName) {
      handleNameChange(username);
    }
  }

  return(
    <footer className="chatbar">
      <input
        className="chatbar-username"
        onKeyUp={handleNameKeyUp}
        defaultValue={clientName}
        placeholder="Your Name"
      />
      <input
        className="chatbar-message"
        onKeyUp={handleMessageKeyUp}
        placeholder="Type a message and hit ENTER"
      />
    </footer>
  );
}

export default ChatBar;
