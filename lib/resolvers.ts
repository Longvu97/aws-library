type TypeName = 'Query' | 'Mutation';

interface IResolver {
  id: string,
  typeName: TypeName,
  fieldName: string;
}

export const QUERY_RESOVLERS: IResolver[] = [
  { id: 'GetBookResolver', typeName: 'Query', fieldName: 'getBook' },
  { id: 'ListBooksResolver', typeName: 'Query', fieldName: 'listBooks' },
  { id: 'ListLibrariesResolver', typeName: 'Query', fieldName: 'listLibraries' },
  { id: 'GetLibraryResolver', typeName: 'Query', fieldName: 'getLibrary' },
];

export const MUTATION_RESOVLERS: IResolver[] = [
  { id: 'CreateBookResolver', typeName: 'Mutation', fieldName: 'createBook' },
  { id: 'CreateLibraryResolver', typeName: 'Mutation', fieldName: 'createLibrary' },
];
