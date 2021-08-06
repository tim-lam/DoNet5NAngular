import { Category } from "category/category";
import { Supplier } from "supplier/supplier";

export class Product {
  productId: number;
  productName: string;
  supplierId ?: number;
  categoryId ?: number;
  quantityPerUnit: string;
  unitPrice ?: number;
  unitsInStock ?: number;
  unitsOnOrder ?: number;
  reorderLevel ?: number;
  discontinued: boolean;

  private _category: Category| undefined;
  private _supplier : Supplier|undefined;

  get category() : Category|undefined { return this._category; }

  set category(value: Category|undefined) {
    this._category = value;
    if (this._category) {
      this.categoryId = this._category.categoryId;
    }
  }

  get supplier() : Supplier|undefined { return this._supplier; }

  set supplier(value: Supplier|undefined) {
    this._supplier = value;
    if (this._supplier) {
      this.supplierId = this._supplier.supplierId;
    }
  }
}
