const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Define broadcast function, it stringifys before sending
wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Server will assign clients colors from this array
const clientColors = ['OrangeRed', 'RoyalBlue', 'LimeGreen', 'DeepPink']
let currentColorIndex = 0;
const getColor = () => {
  return clientColors[currentColorIndex];
}

// Callback functions for each websocket connection (each client)
wss.on('connection', ws => {
  console.log('Client connected');

  // Get a color to use for all of this users messages
  const clientColor = getColor();
  // Increment color index, wrapping back to zero if greater than array length
  currentColorIndex = (currentColorIndex + 1) % clientColors.length;

  // Welcome just the new client with welcome message
  ws.send(JSON.stringify([{
    id: uuid(),
    type: 'notification',
    content: 'Welcome to Chatty App!',
    numberOfUsers: wss.clients.size,
    color: clientColor
  }]));

  //All other users are notified that a new user has joined
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify([{
        id: uuid(),
        type: 'notification',
        content: 'A new user has joined the room',
        numberOfUsers: wss.clients.size,
        color: clientColor
      }]));
    }
  });

  // Set clientName variable to default for use during exit message
  let clientName = 'Anonymous';

  // Give any incoming messages a uuid and a color and broadcast them
  ws.on('message', messageArr => {
    const messages = JSON.parse(messageArr);
    messages.forEach(message => {
      message.id = uuid();
      message.color = clientColor;
    });
    wss.broadcast(messages);

    // Update username variable for exit message
    clientName = messages[0].username;
  });

  // Broadcast an exit message when client closes their connection
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast([{
      id: uuid(),
      type: 'notification',
      content: `${clientName} has left the room`,
      numberOfUsers: wss.clients.size,
      color: clientColor
    }]);
  });
});
