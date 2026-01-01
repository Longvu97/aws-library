import { Injectable } from '@nestjs/common';

import { IAppSyncResolver } from 'src/shared/interfaces/AppSyncResolver.interface';
import { Library } from '../entity/Library.entity';
import { LibraryService } from '../libraries.service';

@Injectable()
export class GetLibraryResolver implements IAppSyncResolver<Library> {
  fieldName = 'getLibrary';

  constructor(private readonly service: LibraryService) {}

  async resolve({ id }: { id: string }): Promise<Library | null> {
    return await this.service.getLibrary({ id });
  }
}
