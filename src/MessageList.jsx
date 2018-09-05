import React from 'react';
import Message from './Message.jsx';

function MessageList({messages}) {
  console.log(messages[0]);
  const messageComponents = messages.map(message => {
    return <Message key={message.id} username={message.username} content={message.content} />
  })
  console.log(messageComponents[0]);
  return(
    <main className="messages">
      {messageComponents}
    </main>
  );
}

export default MessageList;
