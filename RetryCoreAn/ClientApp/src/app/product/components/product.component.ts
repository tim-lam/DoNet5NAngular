import { Component, OnInit, Input } from '@angular/core';
import { SuppliersService  } from 'services/suppliers.service';
import { CategoriesService  } from 'services/categories.service';
import { Product } from 'models/product';
import { Category } from 'models/category';
import { Supplier } from 'models/supplier';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  @Input() model: Product;
  categories: Category[];
  suppliers: Supplier[];

  constructor(private readonly categoriesService: CategoriesService, private readonly  suppliersService: SuppliersService) {}

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
