import { Component, OnInit, Inject } from '@angular/core';
import { SuppliersService  } from 'services/suppliers.service';
import { CategoriesService  } from 'services/categories.service';
import { ProductsService } from 'services/products.service';
import { Product } from 'models/product';
import { Category } from 'models/category';
import { Supplier } from 'models/supplier';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  categories: Category[];
  suppliers: Supplier[];
  title: string;
  description: string;
  //@Output() addProductEvent = new EventEmitter<Product>();

  constructor(public dialogRef: MatDialogRef<ProductComponent, Product>, @Inject(MAT_DIALOG_DATA) public model: Product,
    private readonly location: Location,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly suppliersService: SuppliersService) {
    if (model.productId) {
      this.title = "Edit Product";
      this.description = "Updating the product";
    } else {
      this.title = "Add Product";
      this.description = "Creating a new product";
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getSuppliers();
  }

  getCategories(): void {
    this.categoriesService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  getSuppliers(): void {
    this.suppliersService.getAll()
      .subscribe(suppliers => this.suppliers = suppliers);
  }
}
