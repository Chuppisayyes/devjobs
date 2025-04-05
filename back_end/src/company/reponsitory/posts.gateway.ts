import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true }) // Cho phép CORS
export class PostsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('PostsGateway');

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Emit sự kiện khi có bài viết mới
  sendNewPost(post: any) {
    this.server.emit('new_post', post); // Gửi sự kiện tới tất cả client
  }
  sendUpdatePost(post: any) {
    this.server.emit('update_post_company', post); // Gửi sự kiện tới tất cả client
  }

  sendNewNotificationCandidate(newNotification: any) {
    this.server.emit('new_notifycation_candidate', newNotification);
  }
}
