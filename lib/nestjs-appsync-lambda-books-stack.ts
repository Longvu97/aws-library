import { AuthorizationType, Definition, GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { TableV2, AttributeType, Billing } from 'aws-cdk-lib/aws-dynamodb';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import path from 'path';
import { MUTATION_RESOVLERS, QUERY_RESOVLERS } from './resolvers';

export class NestjsAppsyncLambdaBooksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new TableV2(this, 'MyTable', {
      partitionKey: { 
        name: 'id', 
        type: AttributeType.STRING 
      },
      sortKey: {
        name: 'type',
        type: AttributeType.STRING
      },
      tableName: 'book-table',
      billing: Billing.onDemand(),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const graphqlApi = new GraphqlApi(this, 'GraphQLApi', {
      name: 'BooksApi',
      definition: Definition.fromFile(path.join(__dirname, './graphql/schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.IAM,
        }
      },
      xrayEnabled: true,
    });

    const lambda = new Function(this, 'BookLambda', {
      runtime: Runtime.NODEJS_22_X,
      memorySize: 256,
      code: Code.fromAsset(path.join(__dirname, '../lambda/dist')),
      handler: 'index.handler',
      environment: {
        TABLE_NAME: table.tableName,
      }
    });

    const datasource = graphqlApi.addLambdaDataSource('BookLambdaDataSource', lambda);

    const resolvers = [...QUERY_RESOVLERS, ...MUTATION_RESOVLERS];
    for (const { id, typeName, fieldName } of resolvers) {
      datasource.createResolver(id, { typeName, fieldName });
    }
  }
}
