import { Component, OnInit } from '@angular/core';
import { ProductsService  } from 'services/products.service';
import { Product } from "product/product";
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { ProductComponent } from "components/product.component";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor( public dialog: MatDialog, private readonly productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.productsService.getAll()
      .subscribe(products => this.products = products);
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  initProduct(): void {
    this.selectedProduct = new Product();
    const dialogRef = this.dialog.open(ProductComponent, {
      data: this.selectedProduct 
    });
  }

  addProduct(product: Product): void {
    this.products.push(product);
    
  }

  deleteProduct(product: Product): void {
    this.productsService.delete(product.productId)
      .subscribe(() => {
        var idx = this.products.indexOf(product);
        this.products.splice(idx, 1);
      });
  }
}
