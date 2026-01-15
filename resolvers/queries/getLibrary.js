import { util } from '@aws-appsync/utils';

/**
 * @param {import('@aws-appsync/utils').Context} ctx 
 */
export function request(ctx) {
  const { parId, id } = ctx.arguments;

  const request = {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ parId, id }),
  };

  return request;
}

/**
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the DynamoDB item
 */
export function response(ctx) {
  return ctx.result;
}
