import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Library } from './entity/Library.entity';
import { QueryCommand } from '@aws-sdk/client-dynamodb';

@Injectable()
export class LibraryService {
  private readonly type = 'Library';
  private readonly tableName = process.env.TABLE_NAME;
  constructor(
    @Inject('DYNAMODB_CLIENT')
    private readonly ddb: DynamoDBDocumentClient,
  ) {}

  async getLibrary({ id }: { id: string }) {
    const params = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
        type: this.type,
      },
    });

    try {
      const result = (await this.ddb.send(params)) as unknown as {
        Item: Library;
      };

      if (!result.Item) {
        return null;
      }

      return new Library(result.Item);
    } catch (error) {
      console.error('Error querying book from DynamoDB:', error);
      return null;
    }
  }

  async ListLibrary({ id }: { id: string }) {
    const params = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: '#id = :id and #type = :type',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':id': { S: id },
        ':type': { S: this.type },
      },
    });

    try {
      const result = (await this.ddb.send(params)) as unknown as {
        Items: Library[];
      };

      if (!result.Items) {
        return null;
      }

      return result.Items.map((item) => new Library(item));
    } catch (error) {
      console.error('Error querying library from DynamoDB:', error);
      return null;
    }
  }
}
