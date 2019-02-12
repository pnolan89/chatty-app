import React, {Component} from 'react';
import Message from './Message.jsx';


const MessageList = (props) => {
  const messages = props.messages.map((message) =>
    <Message key={message.id} message={message}/>
  )
  return (
    <main className="messages">
      {messages}
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    </main>
  );
}



export default MessageList;