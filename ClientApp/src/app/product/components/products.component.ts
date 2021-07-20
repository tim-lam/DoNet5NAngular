import { Component, OnInit } from '@angular/core';
import { GenericService as ProductService } from 'services/generic.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: object[];
  selectedProduct: object;
  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.get<object>('products')
      .subscribe(products => this.products = products);
  }

  selectProduct(product: object): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }
}
