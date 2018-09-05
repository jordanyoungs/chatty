import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
  }

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001");
    this.setState({ socket });

    socket.onmessage = event => {
      const messageArr = JSON.parse(event.data);
      console.log(messageArr);
      this.setState({
        messages: this.state.messages.concat(messageArr)
      });
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
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
      username: this.state.currentUser.name,
      content
    }
    this.state.socket.send(JSON.stringify([newMessage]));
  }

  handleNameChange = username => {
    const newNotification = {
      type: 'notification',
      content: `${this.state.currentUser.name} changed their name to ${username}`
    }
    this.setState({currentUser: {name: username}});
    this.state.socket.send(JSON.stringify([newNotification]));
  }

  handleBothChange = (username, content) => {
    const newNotification = {
      type: 'notification',
      content: `${this.state.currentUser.name} changed their name to ${username}`
    }
    this.setState({currentUser: {name: username}});
    const newMessage = {
      type: 'message',
      username: username,
      content
    }
    this.state.socket.send(JSON.stringify([newNotification, newMessage]));
  }
}
export default App;
