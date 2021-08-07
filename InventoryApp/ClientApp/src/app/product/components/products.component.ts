import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService  } from 'services/products.service';
import { Product } from "product/product";
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductComponent } from "components/product.component";
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  @ViewChild(MatTable) table: MatTable<Product>;

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
  }

  addProduct = () => this.openDialog(new Product());

  editProduct = (product: Product) => this.openDialog(product);

  openDialog(product: Product) {

    const dialogRef = this.dialog.open(ProductComponent,

      {
        minWidth: '400px',
        maxWidth: '600px',
        minHeight: '610px',
        data: product
      });

    dialogRef.afterClosed().subscribe(ret => {
      var product = ret as Product;
      if (product) {
        if (product.productId) {
          this.productsService.update(product.productId, product)
            .subscribe(resp => product = resp);
        } else {
          this.productsService.add(product)
            .subscribe(resp => this.products.push(resp));
          this.table.renderRows();
        }
      }
    });
  }

  deleteProduct(product: Product): void {
    this.productsService.delete(product.productId)
      .subscribe(() => {
        var idx = this.products.indexOf(product);
        this.products.splice(idx, 1);
        this.table.renderRows();
      });

  }
}
