import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private adminSocketId: string | null = null;
  private clients: Map<string, Socket> = new Map();

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    this.server.emit('message', payload); // Broadcast message to all connected clients
  }

  @SubscribeMessage('connectAdmin')
  handleAdminConnection(@ConnectedSocket() client: Socket): string {
    console.log('Admin connected');
    this.adminSocketId = client.id; // Store the admin's socket ID
    this.clients.set(client.id, client); // Also store the admin client in the clients map
    return 'Admin connected';
  }

  @SubscribeMessage('connectClient')
  handleClientConnection(
    @MessageBody() body: { clientId: string },
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(data);
    // Set the client in the map with the given clientId
    this.clients.set(body.clientId, client);
    console.log(`Client connected with ID: ${body.clientId}`);
    client.emit('connectionAcknowledged', body.clientId);
  }

  @SubscribeMessage('sendMessageToAdmin')
  handleMessageToAdmin(
    @MessageBody() data: { clientId: string; message: string },
  ): void {
    console.log('Received message for admin:', data);

    if (this.adminSocketId) {
      const adminSocket = this.clients.get(this.adminSocketId);
      if (adminSocket) {
        console.log('Forwarding message to admin:', data);
        adminSocket.emit('messageFromClient', data);
      } else {
        console.log('Admin socket not found');
      }
    } else {
      console.log('Admin is not connected');
    }
  }

  @SubscribeMessage('sendMessageToClient')
  handleMessageToClient(
    @MessageBody() data: { clientId: string; message: string },
  ): void {
    const client = this.clients.get(data.clientId);
    if (client) {
      client.emit('messageFromAdmin', data.message);
      console.log(`Message sent to client ${data.clientId}:`, data.message);
    } else {
      console.log(`Client with ID ${data.clientId} not found`);
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (this.adminSocketId === client.id) {
      this.adminSocketId = null;
      console.log('Admin disconnected');
    } else {
      if (this.clients.has(client.id)) {
        this.clients.delete(client.id);
        console.log(`Client ${client.id} disconnected`);
      }
    }
  }
}
