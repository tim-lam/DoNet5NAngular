import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { SuppliersService  } from 'services/suppliers.service';
import { CategoriesService  } from 'services/categories.service';
import { ProductsService } from 'services/products.service';
import { Product } from 'models/product';
import { Category } from 'models/category';
import { Supplier } from 'models/supplier';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  @Input() model: Product;
  categories: Category[];
  suppliers: Supplier[];
  @Output() addProductEvent = new EventEmitter<Product>();

  constructor(
    private readonly location: Location,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly suppliersService: SuppliersService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getSuppliers();
    if (!this.model) {
      this.model = new Product();
    }
  }

  getCategories(): void {
    this.categoriesService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  getSuppliers(): void {
    this.suppliersService.getAll()
      .subscribe(suppliers => this.suppliers = suppliers);
  }

  addProduct(value: Product) {
    this.addProductEvent.emit(value);
  }

  save(): void {
    if (this.model.productId === undefined) {
      this.productsService.add(this.model)
        .subscribe(product => {
            product.category = this.categories.find(x => x.categoryId === product.categoryId);
            product.supplier = this.suppliers.find(x => x.supplierId === product.supplierId);
            this.addProductEvent.emit(product);

          }
        );
    } else {
      this.productsService.update(this.model.productId, this.model)
        .subscribe(() => this.location.back());
    }
  }
}
