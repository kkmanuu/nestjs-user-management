import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as admin from 'firebase-admin';
import { BadRequestException, NotFoundException } from '@nestjs/common';

jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn(),
    doc: jest.fn().mockReturnValue({
      set: jest.fn(),
      id: 'mockUserId',
    }),
  }),
}));

describe('UsersService', () => {
  let service: UsersService;
  let firestoreMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    firestoreMock = admin.firestore();
  });

  it('should create a new user if email is unique', async () => {
    firestoreMock.get.mockResolvedValue({
      empty: true,
    });
  });
});
