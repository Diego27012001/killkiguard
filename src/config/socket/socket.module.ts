// database.module.ts
import { Module,OnApplicationBootstrap } from '@nestjs/common';
import { configureSocketServer } from './socket.server';


@Module({
  imports: [],
  exports: [],
})
export class SocketModule implements OnApplicationBootstrap {
  // Implementa el método onApplicationBootstrap
  onApplicationBootstrap() {
    // Obtén el servidor HTTP y pásalo a configureSocketServer
    const server = require('http').createServer();
    configureSocketServer(server);
  }
}