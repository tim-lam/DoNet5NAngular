// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from 'components/products.component';
import { ProductComponent } from"components/product.component";
import { ProductsService } from 'services/products.service';
import { CategoriesService } from 'services/categories.service';
import { SuppliersService } from 'services/suppliers.service';
import { HomeComponent } from 'home/home.component';
//import { GenericService } from 'services/generic.service';
const routes:Routes=[
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'products', component: ProductsComponent}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ProductsService, CategoriesService, SuppliersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
