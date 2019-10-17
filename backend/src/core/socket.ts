import socket from 'socket.io';
import http from 'http';

export default (http: http.Server) => {
  const io : socket.Server = socket(http);

  io.on('connection', function (socket: socket.Socket) {
    socket.on('LOT:JOIN', (lotId: string) => {
      //socket.lotId = lotId;
      socket.join('LOT/'+lotId);
    })
    socket.on('LOT:LEAVE', (lotId: string) => {
      socket.leave('LOT/'+lotId);
    })
  });

  return io;
};