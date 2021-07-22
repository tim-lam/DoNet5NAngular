import { Component, OnInit } from '@angular/core';
import { GenericService  } from 'services/generic.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: object[];
  selectedProduct: object;

  constructor(private readonly genericService: GenericService) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.genericService.get<object[]>('products')
      .subscribe(products => this.products = products);
  }
  deleteProduct(id: number): void {
    this.genericService.getProducts( id);
  }
  selectProduct(product: object): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }
}
