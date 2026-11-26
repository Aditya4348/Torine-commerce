import { AiService } from '@nestjs/ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly ai: AiService) {}

  async askAssistant(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  ) {
    const response = await this.ai.generateText({
      model: 'default',
      messages,
      instructions: `Anda adalah Torin AI Concierge, asisten belanja resmi di toko e-commerce Torin Store.
Tugas Anda:
1. Membantu pembeli menemukan produk yang sesuai kebutuhan dan budget mereka.
2. Selalu gunakan tool 'search_products' untuk memeriksa produk dan harga riil di toko sebelum menjawab.
3. Berikan jawaban yang ramah, ringkas, dan sebutkan nama produk serta harganya dalam format Rupiah.`,
    });

    return {
      text: response.text,
    };
  }
}
