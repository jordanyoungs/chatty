import React from 'react';

function ChatBar({currentUser, handleMessage, handleNameChange, handleBothChange}) {
  const handleMessageKeyUp = event => {
    const username = event.target.previousElementSibling.value;
    const content = event.target.value;
    if (event.key === 'Enter' && username !== currentUser.name) {
      handleBothChange(username, content);
      event.target.value = '';
    } else if (event.key === 'Enter') {
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

  return(
    <footer className="chatbar">
      <input
        className="chatbar-username"
        onKeyUp={handleNameKeyUp}
        defaultValue={currentUser.name}
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
