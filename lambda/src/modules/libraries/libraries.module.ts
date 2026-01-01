import { Module } from '@nestjs/common';

import { LibraryService } from './libraries.service';
import { GetLibraryResolver } from './resolvers/get-library.resolver';
import { ListLibraryResolver } from './resolvers/list-library.resolver';

@Module({
  providers: [LibraryService, GetLibraryResolver, ListLibraryResolver],
})
export class LibraryModule {}
