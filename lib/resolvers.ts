type TypeName = 'Query' | 'Mutation';

interface IResolver {
  id: string,
  typeName: TypeName,
  fieldName: string;
  pathName: string;
}

export const QUERY_RESOVLERS: IResolver[] = [
  { id: 'GetBookResolver', typeName: 'Query', fieldName: 'getBook', pathName: '../resolvers/queries/getBook.js' },
  { id: 'ListBooksResolver', typeName: 'Query', fieldName: 'listBooks', pathName: '../resolvers/queries/listBooks.js' },
  { id: 'ListLibrariesResolver', typeName: 'Query', fieldName: 'listLibraries', pathName: '../resolvers/queries/listLibraries.js' },
  { id: 'GetLibraryResolver', typeName: 'Query', fieldName: 'getLibrary', pathName: '../resolvers/queries/getLibrary.js' },
];

export const MUTATION_RESOVLERS: IResolver[] = [
  { id: 'CreateBookResolver', typeName: 'Mutation', fieldName: 'createBook', pathName: '../resolvers/mutates/createBook.js' },
  { id: 'CreateLibraryResolver', typeName: 'Mutation', fieldName: 'createLibrary', pathName: '../resolvers/mutates/createLibrary.js' },
];
