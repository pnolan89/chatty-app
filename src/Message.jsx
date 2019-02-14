import React, {Component} from 'react';

const Message = (props) => {
  let type = props.message.type;
  let userClass = `message-username ${props.message.color}`;
  if (type === 'incomingMessage') {
    return (
      <div className="message">
        <div className={userClass}>{props.message.username}</div>
        <div className="message-content">{props.message.content}</div>
      </div>
    );
  } else if (type === 'incomingNotification') {
    return (
      <div className="message system">
        {props.message.content}
      </div>
    );
  } else if (type === 'incomingImage') {
    console.log(props.message.content);
    return (
      <div className="message">
        <div className={userClass}>{props.message.username}</div>
        <div className="message-content">
          <p>{props.message.content}</p>
          <img src={props.message.images[0]}/>
        </div>
      </div>
    )
  }
}

export default Message;