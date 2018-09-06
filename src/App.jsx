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

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onmessage = event => {
      const messageArr = JSON.parse(event.data);
      console.log(messageArr[0]);
      //if the numberOfUsers has changed, update state
      if (messageArr[0].numberOfUsers) {
        this.setState({
          numberOfUsers: messageArr[0].numberOfUsers,
        });
      }
      this.setState({
        messages: this.state.messages.concat(messageArr)
      });
    };
  }

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

  handleMessage = content => {
    const newMessage = {
      type: 'message',
      username: this.state.clientName,
      content
    }
    this.socket.send(JSON.stringify([newMessage]));
  }

  handleNameChange = username => {
    const newNotification = {
      type: 'notification',
      content: `${this.state.clientName} changed their name to ${username}`
    }
    this.setState({clientName: username});
    this.socket.send(JSON.stringify([newNotification]));
  }

  handleBothChange = (username, content) => {
    const newNotification = {
      type: 'notification',
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
