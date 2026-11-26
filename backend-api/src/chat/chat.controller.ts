import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service.js';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleChat(
    @Body('messages')
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  ) {
    return this.chatService.askAssistant(messages);
  }
}
