import React from 'react';

function Message({type, username, content}) {
  if (type === 'message') {
    return(
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  } else if (type === 'notification') {
    return(
      <div className="message system">
        {content}
      </div>
    );
  }
}

export default Message;
