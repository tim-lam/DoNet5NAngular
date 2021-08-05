import { Injectable } from '@angular/core';
import { GenericService } from 'services/generic.service';
import { HttpClient} from '@angular/common/http';
import { Product } from 'models/product';

@Injectable()
export class ProductsService extends GenericService<Product> {
  constructor(http: HttpClient) { super(http, 'api/products'); }
}


