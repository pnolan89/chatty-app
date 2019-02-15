import React, {Component} from 'react';

const Message = (props) => {
  let message = props.message;
  let type = message.type;
  let content = message.content;
  let userClass = `message-username ${message.color}`;
  if (type === 'incomingMessage') {
    return (
      <div className="message">
        <div className={userClass}>{message.username}</div>
        <div className="message-content">{content}</div>
      </div>
    );
  } else if (type === 'incomingNotification') {
    return (
      <div className="message system">
        {content}
      </div>
    );
  } else if (type === 'incomingImage') {
    let images = message.images.map((image) =>
      <img src={image.url} key={image.id}/>
    )
    return (
      <div className="message">
        <div className={userClass}>{message.username}</div>
        <div className="message-content">
          <p>{content}</p>
          {images}
        </div>
      </div>
    )
  }
}

export default Message;