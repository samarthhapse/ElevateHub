import express from 'express'
import http from 'http';
import { Server } from 'socket.io';
import  { v4 as uuidV4 } from 'uuid';
import cors from 'cors';


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(cors());


app.get('/new-meeting', (req, res) => {
  const meetingId = uuidV4();
  res.send({ meetingId });
});

io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user joined', socket.id);

    socket.on('offer', (payload) => {
      io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', (payload) => {
      io.to(payload.target).emit('answer', payload);
    });

    socket.on('candidate', (payload) => {
      io.to(payload.target).emit('candidate', payload);
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user disconnected', socket.id);
    });
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
