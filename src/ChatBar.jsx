import React, {Component} from 'react';

const ChatBar = (props) => {
  const onSubmit = (event) => {
    event.preventDefault();
    let id = props.newMessageKey;
    let username = event.target.username.value;
    let content = event.target.content.value;
    props.addNewMessage(id, username, content);
  };
  return (
  <form onSubmit={onSubmit}>
    <footer className="chatbar">
        <input name="username" className="chatbar-username" defaultValue={props.currentUser} />
        <input name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        <input type="submit" />
    </footer>
  </form>
  );
}

export default ChatBar;