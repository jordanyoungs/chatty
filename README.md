# Chatty App Project

Chatty is a single-page real-time chat app.

This is a project I built as part of the web development bootcamp at Lighthouse Labs. I was able to practice React and use Websockets and a Websocket Server.

Some of the functionality the page has:
-Messages are broadcast to all clients in real-time
-Users can change their name and a notification about the change will be broadcast
-Notifications are also broadcast when a user joins or leaves
-Each client is given a color, the color scheme is consistent across clients
-The number of connected users is displayed in the top right

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

!["Screenshot of Home page"](https://github.com/jordanyoungs/tweeter/blob/master/docs/Home.png?raw=true)
!["Screenshot during slide animation"](https://github.com/jordanyoungs/tweeter/blob/master/docs/Slide.png?raw=true)
!["Screenshot after slide, form is hidden"](https://github.com/jordanyoungs/tweeter/blob/master/docs/Slide2.png?raw=true)
!["Screenshot of Error message"](https://github.com/jordanyoungs/tweeter/blob/master/docs/Error.png?raw=true)