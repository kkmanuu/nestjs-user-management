import { Controller, Post, Body, Headers, UnauthorizedException, UsePipes, ValidationPipe, Logger, HttpCode } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhookMessageDto } from './dto/webhook-message.dto';

@Controller('webhook')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @HttpCode(200) 
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleWebhook(@Body() webhookMessageDto: WebhookMessageDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; 
    if (token !== process.env.WEBHOOK_SECRET_TOKEN) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.webhooksService.processMessage(webhookMessageDto);
  }
}