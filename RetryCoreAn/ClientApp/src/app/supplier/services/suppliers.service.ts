import { Injectable } from '@angular/core';
import { GenericService } from 'services/generic.service';
import { HttpClient} from '@angular/common/http';
import { Supplier } from "models/supplier";

@Injectable()
export class SuppliersService extends GenericService<Supplier> {
  constructor(http: HttpClient) { super(http, 'api/suppliers'); }
}


