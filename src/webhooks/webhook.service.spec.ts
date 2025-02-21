import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksService } from './webhooks.service';
import { BadRequestException } from '@nestjs/common';

describe('WebhooksService', () => {
  let service: WebhooksService;

  const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhooksService,
        { provide: 'FIRESTORE', useValue: mockFirestore },
      ],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  it('should process a message and store it in Firestore', async () => {
    const webhookMessageDto = { message: 'help', phone: '+1234567890' };

    const result = await service.processMessage(webhookMessageDto);

    expect(result).toEqual({ reply: 'How can I assist you?' });
    expect(mockFirestore.collection).toHaveBeenCalledWith('messages');
    expect(mockFirestore.doc).toHaveBeenCalled();
    expect(mockFirestore.set).toHaveBeenCalledWith({
      message: 'help',
      phone: '+1234567890',
      timestamp: expect.any(Date),
    });
  });

  it('should throw an error if message or phone is missing', async () => {
    const webhookMessageDto = { message: '', phone: '' };

    await expect(service.processMessage(webhookMessageDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});