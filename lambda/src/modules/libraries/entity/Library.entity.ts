export class Library {
  id: string;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: {
    id: string;
    type: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }) {
    Object.assign(this, props);
  }
}
