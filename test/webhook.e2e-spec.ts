import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';
import { WebhooksService } from '../src/webhooks/webhooks.service';

// Load environment variables from .env
dotenv.config({ path: '.env' });

describe('WebhookController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  const validPhoneNumber = '+123456789012';
  const validMessage = 'help';

  // Mock WebhooksService
  const mockWebhooksService = {
    processMessage: jest.fn().mockImplementation((dto) => {
      if (dto.message.includes('help')) {
        return { reply: 'How can I assist you?' };
      }
      return { reply: 'Support contact: support@company.com' };
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WebhooksService)
      .useValue(mockWebhooksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/webhook (POST) should return "help" response when triggered', async () => {
    // Debugging: Ensure the token is loaded
    console.log('Test Token:', process.env.WEBHOOK_SECRET_TOKEN);

    expect(process.env.WEBHOOK_SECRET_TOKEN).toBeDefined();

    const response = await request(server)
      .post('/webhook')
      .send({
        message: validMessage,
        phone: validPhoneNumber,
      })
      .set('Authorization', `Bearer ${process.env.WEBHOOK_SECRET_TOKEN}`);

    // Debugging: Log the response details
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);
    console.log('Response Headers:', response.headers);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reply: 'How can I assist you?' });
  });

  it('/webhook (POST) should return 401 Unauthorized when token is missing', async () => {
    const response = await request(server)
      .post('/webhook')
      .send({
        message: validMessage,
        phone: validPhoneNumber,
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid token',
      error: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('/webhook (POST) should return 401 Unauthorized when token is incorrect', async () => {
    const response = await request(server)
      .post('/webhook')
      .send({
        message: validMessage,
        phone: validPhoneNumber,
      })
      .set('Authorization', 'Bearer wrong-token');

    expect(response.status).toBe(401);
  });
});