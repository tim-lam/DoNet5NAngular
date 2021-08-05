import { Injectable } from '@angular/core';
import { GenericService } from 'services/generic.service';
import { HttpClient} from '@angular/common/http';
import { Category } from "models/category";

@Injectable()
export class CategoriesService extends GenericService<Category> {
  constructor(http: HttpClient) { super(http, 'api/categories'); }
}
