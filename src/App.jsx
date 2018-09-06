import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      clientName: 'Anonymous',
      messages: [],
      numberOfUsers: 0
    };
  }

  // When component mounts, connect to chatty server
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    // When a server message is received, add it to state messages
    this.socket.onmessage = event => {
      const messageArr = JSON.parse(event.data);
      this.setState({
        messages: this.state.messages.concat(messageArr)
      });

      // If the numberOfUsers has changed, update state
      if (messageArr[0].numberOfUsers) {
        this.setState({
          numberOfUsers: messageArr[0].numberOfUsers
        });
      }
    };
  }

  // Assemble components, passing all necessary props
  render() {
    return (
      <div>
        <NavBar numberOfUsers={this.state.numberOfUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          clientName={this.state.clientName}
          handleMessage={this.handleMessage}
          handleNameChange={this.handleNameChange}
          handleBothChange={this.handleBothChange}
        />
      </div>
    );
  }

  // My 3 handler functions that get passed to chatbar

  // When they are just sending a message
  // Take the content, build the message object and send to server
  handleMessage = content => {
    const newMessage = {
      type: 'message',
      username: this.state.clientName,
      content
    }
    this.socket.send(JSON.stringify([newMessage]));
  }

  // When they are just changing their name
  // Take the new name, build notification object, and send to server
  handleNameChange = username => {
    const newNotification = {
      type: 'notification',
      username,
      content: `${this.state.clientName} changed their name to ${username}`
    }
    // Also, update username in state
    this.setState({clientName: username});
    this.socket.send(JSON.stringify([newNotification]));
  }

  // When the name field has been altered without hitting enter, then a message is submitted
  // Take the new name and the content, build both objects, and send to server in an array
  handleBothChange = (username, content) => {
    const newNotification = {
      type: 'notification',
      username,
      content: `${this.state.clientName} changed their name to ${username}`
    }
    this.setState({clientName: username});

    const newMessage = {
      type: 'message',
      username: username,
      content
    }
    this.socket.send(JSON.stringify([newNotification, newMessage]));
  }
}
export default App;
