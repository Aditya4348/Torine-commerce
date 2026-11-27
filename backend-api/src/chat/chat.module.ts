import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';
import { ProductTools } from './tools/product.tools.js';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ProductTools],
})
export class ChatModule {}

