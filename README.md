# Chatty App Project

Chatty is a single-page real-time chat app.

This is a project I built as part of the web development bootcamp at Lighthouse Labs. I was able to practice React and use Websockets and a Websocket Server.

Some of the functionality the page has:
- Messages are broadcast to all clients in real-time
- Users can change their name and a notification about the change will be broadcast
- Notifications are also broadcast when a user joins or leaves
- Each client is given a color, the color scheme is consistent across clients
- The number of connected users is displayed in the top right

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command. This should also install the dependencies of the chatty-server.
3. You will need two terminal tabs: one for the server, one for the app.
   Start the web server in one terminal using the `npm run server` command.
4. Start the app in another terminal using the 'npm start' command.
   The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.
6. Open multiple tabs or browsers to mimic multiple clients.

## Screenshots

Two clients side by side
!["Screenshot of two clients on load"](https://github.com/jordanyoungs/chatty/blob/master/docs/Home.png?raw=true)

Name change feature
!["Screenshot of names changing"](https://github.com/jordanyoungs/chatty/blob/master/docs/NameChanges.png?raw=true)

Messages being sent
!["Screenshot of some messaging"](https://github.com/jordanyoungs/chatty/blob/master/docs/Messaging.png?raw=true)

Client leaving chatroom
!["Screenshot of a client leaving"](https://github.com/jordanyoungs/chatty/blob/master/docs/Leaving.png?raw=true)
