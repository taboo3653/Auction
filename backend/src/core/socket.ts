import socket from 'socket.io';
import http from 'http';

export default (http: http.Server) => {
  const io : socket.Server = socket(http);

  io.on('connection', function (socket: socket.Socket) {
    let roomId :string;
    socket.on('LOT:JOIN', (lotId: string) => {
      roomId = 'LOT/'+lotId;
      socket.join(roomId);
    })
    socket.on('LOT:LEAVE', () => {
      if(roomId)
        socket.leave(roomId);
    })
  });

  return io;
};