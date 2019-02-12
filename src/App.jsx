import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        {
          id: 3,
          username: "Michelle",
          content: "Hello there!"
        }
      ],
      newMessageKey: 4
    };
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(id, username, content) {
    const newMessage = {id: id, username: username, content: content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({
      messages: messages,
      newMessageKey: this.state.newMessageKey + 1
    });
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
