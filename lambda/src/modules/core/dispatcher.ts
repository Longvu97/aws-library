import { Injectable } from '@nestjs/common';
import { AppSyncResolverEvent } from 'aws-lambda';
import { IAppSyncResolver } from 'src/shared/interfaces/AppSyncResolver.interface';

@Injectable()
export class AppSyncDispatcher {
  constructor(private readonly resolvers: IAppSyncResolver<unknown>[]) {}

  dispatch<TArgs = any, TSource = any>(
    event: AppSyncResolverEvent<TArgs, TSource>,
  ) {
    const resolver = this.resolvers.find(
      (r) => r.fieldName === event.info.fieldName,
    );

    if (!resolver) {
      throw new Error(`No resolver for ${event.info.fieldName}`);
    }

    return resolver.resolve(event);
  }
}
