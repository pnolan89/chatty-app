Chatty
=====================

A single-page app built with React that lets multiple clients send messages to each other in a chatroom environment.

### Features

- Users can send text-based messages to each other
- Users can update their display names
- Messages can include images, either by:
-- Providing links in the message text, or...
-- Beginning a message with the '/gif' command, followed by some text for the Giphy API to search from
- A display that shows the current number of connected users

### Project Stack
- Front End: JavaScript, React, HTML, SASS
- Back End: Node, Express, WS

### Screenshots
![Main App View](https://github.com/pnolan89/chatty-app/blob/master/docs/screenshots/Screen%20Shot%202019-02-15%20at%203.55.06%20PM.png?raw=true)

### Getting Started
1. Clone the repo to your local machine
2. In the root folder, run ```npm install``` to install the client server's dependencies.
3. In the chatty_server folder, run ```npm install``` to install the WebSocket server's dependencies.
4. In the chatty_server folder, create an .env file. In your .env, enter your Gify API key in the following format:
```
API_KEY=[YOUR KEY HERE]
```
5. Initialize the servers by running ```npm start``` in both the root and chatty_server directories, and open the app on http://localhost:3000

### Dependencies
#### App:
- React
- Webpack
- Babel
- WS
- SASS Loader
- SockJS
- Style Loader

#### WebSocket:
- Express
- WS
- UUID
- dotenv
- Request