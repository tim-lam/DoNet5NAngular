import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GenericService as ProductService } from 'services/generic.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  @Input() product: object;
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.productService.update(this.product, 'products')
      .subscribe(() => this.goBack());
  }
  ngOnInit(): void {
    //this.route.paramMap
    //  .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    //  .subscribe(hero => this.hero = hero);
  }
}
