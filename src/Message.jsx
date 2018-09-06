import React from 'react';

function Message({type, username, content, color}) {
  if (type === 'message') {
    // Render messages this way
    return(
      <div className="message">
        <span className="message-username" style={{color: color}} >{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  } else if (type === 'notification') {
    // Render notifications this way
    return(
      <div className="message system" style={{color: color}} >
        {content}
      </div>
    );
  }
}

export default Message;
