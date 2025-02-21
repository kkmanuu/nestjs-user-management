import { Injectable, Logger, Inject, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { WebhookMessageDto } from './dto/webhook-message.dto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);
  private readonly db: admin.firestore.Firestore;

  constructor(@Inject('FIRESTORE') private readonly firestore: admin.firestore.Firestore) {
    this.db = firestore;
  }

  async processMessage(webhookMessageDto: WebhookMessageDto) {
    this.logger.log('Processing webhook message:', webhookMessageDto);

    // Validate the input
    if (!webhookMessageDto.message || !webhookMessageDto.phone) {
      throw new BadRequestException('Message and phone are required');
    }

    const { message, phone } = webhookMessageDto;

    try {
      // Store the message in Firestore
      const messageRef = this.db.collection('messages').doc();
      await messageRef.set({ message, phone, timestamp: new Date() });
      this.logger.log('Message stored successfully:', { message, phone });

      // Handle the "help" message
      if (message.includes('help')) {
        return { reply: 'How can I assist you?' };
      }

      return { reply: 'Support contact: support@company.com' };
    } catch (error) {
      this.logger.error('Error processing message:', error);
      throw new Error('Failed to process message');
    }
  }
}