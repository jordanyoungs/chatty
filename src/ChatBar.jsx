import React from 'react';

function ChatBar({currentUser, handleMessage}) {
  const handleMessageKeyUp = event => {
    if (event.key === 'Enter') {
      const type = 'message';
      const username = currentUser.name;
      const content = event.target.value;

      const message = {
        type,
        username,
        content
      }

      handleMessage(message);
      event.target.value = '';
    }
  }

  const handleNameKeyUp = event => {
    if (event.key === 'Enter') {
      const type = 'notification';
      const username = event.target.value;
      const content = `${currentUser.name} changed their name to ${username}`;

    const message = {
      type,
      username,
      content
    }

    handleMessage(message);
    }
  }

  const handleBlur = event => {
    const username = event.target.value;
    if (username !== currentUser.name) {
      handleMessage({
        type: 'notification',
        username,
        content: `${currentUser.name} changed their name to ${username}`
      });
    }
  }

  return(
    <footer className="chatbar">
      <input
        className="chatbar-username"
        onKeyUp={handleNameKeyUp}
        onBlur={handleBlur} defaultValue={currentUser.name}
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
