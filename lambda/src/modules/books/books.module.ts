import { Module } from '@nestjs/common';

import { GetBookResolver } from './resolvers/get-book.resolver';
import { ListBookResolver } from './resolvers/list-book.resolver';
import { BooksService } from './books.service';

@Module({
  providers: [GetBookResolver, ListBookResolver, BooksService],
})
export class BookModule {}
