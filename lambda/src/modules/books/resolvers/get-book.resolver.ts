import { Injectable } from '@nestjs/common';

import { IAppSyncResolver } from 'src/shared/interfaces/AppSyncResolver.interface';
import { Book } from '../entity/Book.entity';
import { BooksService } from '../books.service';

@Injectable()
export class GetBookResolver implements IAppSyncResolver<Book> {
  fieldName = 'getBook';

  constructor(private readonly service: BooksService) {}

  async resolve({ id }: { id: string }): Promise<Book | null> {
    return await this.service.getBook({ id });
  }
}
