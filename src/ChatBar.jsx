import React, {Component} from 'react';

const ChatBar = (props) => {
  const messageSubmit = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      let id = props.newMessageKey;
      let username = props.currentUser;
      let content = event.target.value;
      const newMessage = {username: username, content: content}
      props.addNewMessage(newMessage);
      event.target.value = "";
    }
  };

const usernameSubmit = (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
    let name = event.target.value;
    props.changeCurrentUser(name);
  }
}

  return (
  <footer className="chatbar">
      <input onKeyPress={usernameSubmit} name="username" className="chatbar-username" defaultValue={props.currentUser} />
      <input onKeyPress={messageSubmit} name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>
  );
}

export default ChatBar;