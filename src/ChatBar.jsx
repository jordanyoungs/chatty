import React from 'react';

function ChatBar({currentUser}) {
  return(
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={currentUser.name} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

export default ChatBar;
