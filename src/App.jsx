import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      newMessageKey: 1
    };
    this.socket = new WebSocket("ws://localhost:3001");
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    const messages = this.state.messages.concat(message);
    this.socket.send(`User ${message.username} said ${message.content}`);
    this.setState({
      messages: messages,
      newMessageKey: this.state.newMessageKey + 1
    });
  }

  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log('Connected to server!');
    };
  }


  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    <MessageList messages={this.state.messages}/>
    <ChatBar currentUser={this.state.currentUser.name} addNewMessage={this.addNewMessage} newMessageKey={this.state.newMessageKey}/>
    </div>
    );
  }
}
export default App;
