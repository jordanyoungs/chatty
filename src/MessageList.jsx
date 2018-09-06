import React from 'react';
import Message from './Message.jsx';

function MessageList({messages}) {
  const messageComponents = messages.map(message => {
    return <Message
      key={message.id}
      type={message.type}
      username={message.username}
      content={message.content}
      color={message.color}
      />
  })

  return(
    <main className="messages">
      {messageComponents}
    </main>
  );
}

export default MessageList;
