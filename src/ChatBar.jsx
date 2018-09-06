import React from 'react';

function ChatBar({clientName, handleMessage, handleNameChange, handleBothChange}) {

  // Handles keyups on the message input field
  const handleMessageKeyUp = event => {
    const content = event.target.value;
    // Get value of name input field
    const username = event.target.previousElementSibling.value;

    // If key is enter, and the name field has an unsent change, call handleBoth and clear message field
    if (event.key === 'Enter' && username !== clientName) {
      handleBothChange(username, content);
      event.target.value = '';

    // Else if key is enter and name field didn't change, call handleMessage and clear message field
    } else if (event.key === 'Enter') {
      handleMessage(content);
      event.target.value = '';
    }
  }

  // Handles keyups on the name input field
  const handleNameKeyUp = event => {
    const username = event.target.value;
    // If key pressed is enter, call handleNameChange on new name
    if (event.key === 'Enter' && username !== clientName) {
      handleNameChange(username);
    }
  }

  // Render
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
