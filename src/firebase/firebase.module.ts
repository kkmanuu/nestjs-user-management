import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        const serviceAccount = JSON.parse(
          fs.readFileSync('./config/serviceAccountKey.json', 'utf8'),
        );

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }

        return admin.firestore();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}