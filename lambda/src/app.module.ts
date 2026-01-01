import { Module } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

import { BookModule } from './modules/books/books.module';
import { LibraryModule } from './modules/libraries/libraries.module';
import { AppSyncDispatcher } from './modules/core/dispatcher';

@Module({
  imports: [BookModule, LibraryModule],
  providers: [
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: () => {
        const client = new DynamoDBClient({
          region: process.env.AWS_REGION,
        });

        return DynamoDBDocumentClient.from(client);
      },
    },
    AppSyncDispatcher,
  ],
})
export class AppModule {}
