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
    let images = props.message.images.map((image) =>
      <img src={image.url} key={image.id}/>
    )
    return (
      <div className="message">
        <div className={userClass}>{props.message.username}</div>
        <div className="message-content">
          <p>{props.message.content}</p>
          {images}
        </div>
      </div>
    )
  }
}

export default Message;