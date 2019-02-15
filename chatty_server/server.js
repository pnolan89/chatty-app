const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
const dotenv = require('dotenv').config();
const request = require('request');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Callback that runs when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // Create clientConnect message. For updating the "users connected" count
  let clientConnect = {
    type: "clientConnect",
    count: wss.clients.size,
    id: uuidv4()
  };
  // Create clientColor message. For assigning a random color to new client for username display
  const colors = ["red", "yellow", "green", "blue", "orange", "purple", "pink"];
  let clientColor = {
    type: "clientColor",
    color: colors[Math.floor(Math.random() * colors.length)],
    id: uuidv4()
  };
  // Send clientConnect to all clients, and clientColor only to new client
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientConnect));
    if (client === ws) {
      client.send(JSON.stringify(clientColor));
    }
  });

  // Handles data coming from clients
  ws.on('message', (data) => {
    let newMessage = JSON.parse(data);
    newMessage.id = uuidv4();
    newMessage.sync = true;
    // For postMessage requests
    if (newMessage.type === "postMessage") {
      let contentArray = newMessage.content.split(' ');
      // Check if post contains gif command
      if (contentArray[0] === '/gif') {
        newMessage.sync = false;
        console.log('message type: ', newMessage.type);
        newMessage.content = contentArray.splice(1).join(' ');
        const requestOptions = {
          url: `http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${newMessage.content}`,
          json: true
        };
        request(requestOptions, (error, response, gifData) => {
          if (error) {
            newMessage.content = error;
          } else {
            newMessage.image = gifData.data[0].images.original.url;
          }
          newMessage.type = "incomingGify";
          let newMessageString = JSON.stringify(newMessage);
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(newMessageString);
            }
          });
        });
      }
      // Check if post contains image urls (case-insensitive)
      const checkImgURL = /\.jpg|\.png|\.gif/i;
      if (checkImgURL.test(newMessage.content)) {
        // If it does, create an incomingImage message for client
        newMessage.type = "incomingImage";
        let imgArray = [];
        let txtArray = [];
        contentArray.forEach(function(word) {
          if (checkImgURL.test(word)) {
            imgArray.push({
              url: word,
              id: uuidv4()
            });
          } else {
            txtArray.push(word);
          }
        });
        newMessage.content = txtArray.join(' ');
        newMessage.images = imgArray;
      } else {
      // Otherwise, create an incomingMessage message for client
      newMessage.type = "incomingMessage";
      }
    // For postNotification requests
    } else if (newMessage.type === "postNotification") {
      // Create an incomingNotification message for client
      newMessage.type = "incomingNotification";
    }
    if (newMessage.sync) {
      let newMessageString = JSON.stringify(newMessage);
      // Broadcast the message to all clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(newMessageString);
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    // Send clientDisconnect message to client, to update "users connected" count
    let clientDisconnect = {type: "clientDisconnect", id: uuidv4()};
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(clientDisconnect));
    });
  });

});