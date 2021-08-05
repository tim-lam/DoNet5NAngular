import { Product } from "models/product";

export class Category {
  categoryId: number;
  categoryName: string;
  description: string;
  picture: ArrayBuffer;
  products: Product[];
}
