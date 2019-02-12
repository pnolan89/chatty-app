import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
    <div>
    <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    <main className="messages">
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    </main>
    <ChatBar />
    </div>
    );
  }
}
export default App;
