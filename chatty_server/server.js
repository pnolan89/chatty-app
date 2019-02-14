const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let clientConnect = {type: "clientConnect", count: wss.clients.size, id: uuidv4()};
  // console.log(JSON.stringify(clientCount));
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientConnect));
  });
  ws.on('message',(data)=>{
    let newMessage = JSON.parse(data);
    newMessage.id = uuidv4();
    if (newMessage.type === "postMessage") {
      newMessage.type = "incomingMessage";
    } else if (newMessage.type === "postNotification") {
      newMessage.type = "incomingNotification";
    }
    let newMessageString = JSON.stringify(newMessage);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newMessageString);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let clientDisconnect = {type: "clientDisconnect", id: uuidv4()};
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(clientDisconnect));
    });
  });

});