import React from 'react';

function ChatBar({currentUser, handleMessage, handleNameChange}) {
  const handleMessageKeyUp = event => {
    if (event.key === 'Enter') {
      const content = event.target.value;
      handleMessage(content);
      event.target.value = '';
    }
  }

  const handleNameKeyUp = event => {
    const username = event.target.value;
    if (event.key === 'Enter' && username !== currentUser.name) {
      handleNameChange(username);
    }
  }

  const handleNameBlur = event => {
    const username = event.target.value;
    if (username !== currentUser.name) {
      handleNameChange(username);
    }
  }

  return(
    <footer className="chatbar">
      <input
        className="chatbar-username"
        onKeyUp={handleNameKeyUp}
        onBlur={handleNameBlur} defaultValue={currentUser.name}
        placeholder="Your Name (Optional)"
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
