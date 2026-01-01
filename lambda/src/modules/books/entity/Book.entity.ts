export class Book {
  id: string;
  type: string;
  title: string;
  author?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: {
    id: string;
    type: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    author?: string;
    image?: string;
  }) {
    Object.assign(this, props);
  }
}
