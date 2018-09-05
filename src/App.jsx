import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let increasingId = 3;

const dummyData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: "1",
      type: 'message',
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: "2",
      type: 'message',
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor() {
    super();
    this.state = dummyData;
  }

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001");
    console.log('Connected to server');
    this.setState({ socket });
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
        />
      </div>
    );
  }

  handleMessage = content => {
    const newMessage = {
      id: increasingId++,
      type: 'message',
      username: this.state.currentUser.name,
      content
    }
    this.state.socket.send(JSON.stringify(newMessage));
    const messages = [...this.state.messages, newMessage];
    this.setState({ messages });
  }

  handleNameChange = username => {
    const newMessage = {
      id: increasingId++,
      type: 'notification',
      content: `${this.state.currentUser.name} changed their name to ${username}`
    }
    const messages = [...this.state.messages, newMessage];
    this.setState({
      messages,
      currentUser: {name: username}
    });
  }
}
export default App;
