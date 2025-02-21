import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsersService = {
    getPaginatedUsers: jest.fn().mockResolvedValue({
      users: [{ id: 1, name: 'John Doe' }],
      nextCursor: 'next-cursor-id',
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) should return paginated users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .query({ limit: 10, cursor: 'cursor-id' });

    console.log(response.body); // 🔍 Debug output
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body).toHaveProperty('nextCursor');
  });

  afterAll(async () => {
    await app.close();
  });
});