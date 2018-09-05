import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let increasingId = 4;

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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, type: 'message', username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
