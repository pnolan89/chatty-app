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
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
  }

  addNewMessage(message) {
    const messages = this.state.messages.concat(message);
    this.socket.send(JSON.stringify(message));
  }

  changeCurrentUser(newName) {
    let notification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newName}`
    };
    this.setState({
      currentUser: {name: newName}
    });
    this.socket.send(JSON.stringify(notification));
  }

  componentDidMount() {
    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      if (message.type === 'clientConnect') {
        this.setState({
          clientCount: message.count
        });
      } else if (message.type === 'clientDisconnect') {
        let currentClients = (this.state.clientCount - 1);
        this.setState({
          clientCount: currentClients
        });
      } else {
        let messages = this.state.messages.concat(message);
        this.setState({
          messages: messages,
        });
      }
    };
  }

  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="users-online">{this.state.clientCount} user(s) online</span>
    </nav>
    <MessageList messages={this.state.messages}/>
    <ChatBar currentUser={this.state.currentUser.name} addNewMessage={this.addNewMessage} changeCurrentUser={this.changeCurrentUser}/>
    </div>
    );
  }
}
export default App;
