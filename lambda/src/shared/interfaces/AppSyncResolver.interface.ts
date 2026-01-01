export interface IAppSyncResolver<T> {
  fieldName: string;
  resolve(event: any): Promise<T | null>;
}
