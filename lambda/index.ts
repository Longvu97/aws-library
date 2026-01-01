import { AppSyncResolverEvent } from 'aws-lambda';
import { INestApplicationContext } from '@nestjs/common';

import { createApp } from 'src/main';
import { AppSyncDispatcher } from 'src/modules/core/dispatcher';

let cachedApp: INestApplicationContext;

async function bootstrap(): Promise<INestApplicationContext> {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await createApp();
  cachedApp = app;

  return app;
}

export async function handler(
  event: AppSyncResolverEvent<Record<string, any>>,
): Promise<any> {
  const app = await bootstrap();

  const { info, arguments: args } = event;

  const fieldName = info?.fieldName;
  const parentTypeName = info?.parentTypeName;

  try {
    console.log('AppSync resolver event:', {
      fieldName,
      parentTypeName,
      arguments: args,
    });

    return app.get(AppSyncDispatcher).dispatch(event);
  } catch (error) {
    console.error('Error executing resolver:', error);
    throw error;
  }
}
