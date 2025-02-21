import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly db = admin.firestore();

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const usersRef = this.db.collection('users');

    // Check if email already exists
    const existingUser = await usersRef.where('email', '==', createUserDto.email).get();
    if (!existingUser.empty) {
      throw new BadRequestException('Email already in use');
    }

    const userRef = usersRef.doc();
    const user: User = {
      id: userRef.id,
      ...createUserDto,
      createdAt: admin.firestore.FieldValue.serverTimestamp() as FirebaseFirestore.Timestamp, // Fix for Firestore timestamp
    };

    await userRef.set(user);
    return { ...user }; // Return user with correct types
  }

  // Fetch all users with pagination
  async getPaginatedUsers(limit: number, cursor?: string): Promise<{ users: User[]; nextCursor?: string }> {
    let query = this.db.collection('users').orderBy('createdAt').limit(limit);

    if (cursor) {
      const startAfterDoc = await this.db.collection('users').doc(cursor).get();
      if (!startAfterDoc.exists) throw new NotFoundException('Cursor not found');
      query = query.startAfter(startAfterDoc);
    }

    const snapshot = await query.get();
    const users = snapshot.docs.map((doc) => doc.data() as User);

    const nextCursor = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : undefined;

    return { users, nextCursor };
  }

  // Fetch a single user by ID
  async findOne(id: string): Promise<User> {
    const doc = await this.db.collection('users').doc(id).get();
    if (!doc.exists) throw new NotFoundException('User not found');
    return doc.data() as User;
  }

  // Update user details (email is immutable)
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userRef = this.db.collection('users').doc(id);

    try {
      await this.db.runTransaction(async (transaction) => {
        const existingUser = await transaction.get(userRef);
        if (!existingUser.exists) throw new NotFoundException('User not found');

        // Ensure email is not updated
        if ('email' in updateUserDto) {
          throw new BadRequestException('Email cannot be updated');
        }

        // Convert UpdateUserDto to a plain object
        const updateData = JSON.parse(JSON.stringify(updateUserDto));

        transaction.update(userRef, updateData);
      });

      const updatedUser = await userRef.get();
      return updatedUser.data() as User;
    } catch (error) {
      console.error('🔥 Error updating user:', error); // Log the actual error
      throw new Error('Internal server error'); // Ensure a clean error response
    }
  }
}