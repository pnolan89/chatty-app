import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      clientCount: 0
    };
    this.socket = new WebSocket("ws://localhost:3001");
    // Method bindings
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
  }

  // Send new message to server, to be broadcast to all connected clients
  addNewMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  // Changes current user's display name, and sends a notification to the server to be broadcast to all connected clients
  changeCurrentUser(newName) {
    let notification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newName}`
    };
    this.setState({
      currentUser: {
        name: newName,
        color: this.state.currentUser.color
      }
    });
    this.socket.send(JSON.stringify(notification));
  }

  // Automatically scrolls the page to the bottom when a new message is posted
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    // Handle incoming messages from server
    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      // Client connected, update count
      if (message.type === 'clientConnect') {
        this.setState({
          clientCount: message.count
        });
      // Client disconnected, update count
      } else if (message.type === 'clientDisconnect') {
        let currentClients = (this.state.clientCount - 1);
        this.setState({
          clientCount: currentClients
        });
      // New message or notification, update message list
      } else if (message.type === 'clientColor') {
        this.setState({
          currentUser: {
            name: this.state.currentUser.name,
            color: message.color
          }
        });
      } else {
        let messages = this.state.messages.concat(message);
        this.setState({
          messages: messages,
        });
      }
    };
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // 'messagesEnd' div and 'scrollToBottom' method inspired by metakermit on Stack Overflow:
  // (https://stackoverflow.com/questions/37620694/)
  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="users-online">{this.state.clientCount} user(s) online</span>
      </nav>
      <MessageList messages={this.state.messages}/>
      <div className="messagesEnd" ref={(el) => { this.messagesEnd = el; }}></div>
      <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} changeCurrentUser={this.changeCurrentUser}/>
    </div>
    );
  }
}
export default App;
