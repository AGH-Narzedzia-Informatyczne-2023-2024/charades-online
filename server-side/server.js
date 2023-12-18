const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  secret: 'your-secret-keyxd',
  resave: true,
  saveUninitialized: true,
});

app.use(cookieParser());
app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(express.static('public'));


  let activeUsers = [];
  let rooms = {};

  io.on('connection', (socket) => {
    console.log('A USER CONNECTED WITH ID: ', socket.handshake.auth.userId);
  
    if(socket.handshake.auth.userId === null){
      let id;
      do{
        id = getRandomUserId();
      }while(activeUsers.includes(id));

      socket.handshake.auth.userId = id;
      activeUsers.push(id);
      console.log("NO SESSION ID. NEW ID=", id);
      socket.emit("session", {
        userId: id,
      });
    } else{
      console.log("\x1b[32m USER AUTHENTICATED WITH ID\x1b[0m",socket.handshake.auth.userId);
      const userId = socket.handshake.auth.userId;

      for (const [key, room] of Object.entries(rooms)) {
        //console.log(`${key}: ${room}`);
        if(room.players.includes(userId)){
          io.to(socket.id).emit('joinRoom', { key, room });
        }
      }
      
  
      // Handle room creation
      socket.on('createRoom', () => {
        console.log("CREATE ROOM");
        const roomId = Math.random().toString(36).substr(2, 8);
        rooms[roomId] = { players: [userId] };
        socket.join(roomId);
        io.to(socket.id).emit('roomCreated', { roomId });
        console.log("\x1b[32m ROOM CREATED WITH ID: \x1b[0m", roomId);
      });
  
      // Handle joining a room
      socket.on('joinRoom', (roomId) => {
        console.log("JOINING ROOM ID: ", roomId);

        if (rooms[roomId] && rooms[roomId].players.length < 4) {
          rooms[roomId].players.push(userId);
          socket.join(roomId);
          let room = rooms[roomId]
          io.to(socket.id).emit('joinRoom', { roomId, room });
        } else {
          io.to(socket.id).emit('joinError', 'Room is full or does not exist');
        }

      });
  
       // Handle leaving a room
      socket.on('leaveRoom', (roomId) => {
        console.log(`\x1b[31m PLAYER ${userId} LEAVING ROOM ${roomId}\x1b[0m`);
        if (rooms[roomId]) {
          rooms[roomId].players = rooms[roomId].players.filter((id) => id !== userId);
          //socket.leave(roomId);
          io.to(socket.id).emit('playerLeft', rooms[roomId].players);
        }
      });

      socket.on('canvasData', (dataUrl) => {
        const imageData = dataUrl.replace(/^data:image\/\w+;base64,/, '');
        io.emit('canvasData', { imageData });
      });
  
      // // Handle game start
      // socket.on('startGame', (roomId) => {
      //   // Implement your game start logic here
      //   io.to(roomId).emit('gameStarted');
      // });
  
      // // Handle disconnect
      // socket.on('disconnect', () => {
      //   console.log('A user disconnected');
      //   for (const roomId in rooms) {
      //     rooms[roomId].players = rooms[roomId].players.filter((id) => id !== userId);
      //     io.to(roomId).emit('playerLeft', rooms[roomId].players);
      //   }
      // });
    }
  });

const getRandomUserId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

server.listen(PORT, function () {
    var date = new Date();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    console.log(`Server running on port ${PORT}, ${hour}:${minutes}`);
  });