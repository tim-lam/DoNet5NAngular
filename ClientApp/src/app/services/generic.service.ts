import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private baseUrl = 'api/';  // URL to web api

  constructor(private http: HttpClient) {}

  get<T>(modelName: string, id? : number): Observable<T> {
    let url = `${this.baseUrl}${modelName}`;
    if (id) {
      url = `${url}/${id}`;
      console.log(url);
      return this.http.get<T>(url)
        .pipe(catchError(this.handleError<T>('get')));
    } else {
      console.log(url);
      return this.http.get<T>(url)
        .pipe(catchError(this.handleError<T>('get')));
    }
  }
  getProducts(id: number): Observable<object[]> {
    const url = `api/products`;
    console.log(url);
    return this.http.get<object[]>(url).pipe(catchError(this.handleError<any>(`getHero id=${id}`))
    );
  }

  add<T> (modelName:string, model: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${modelName}`, model, httpOptions)
      .pipe(catchError(this.handleError<T>('add'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete<T> (modelName: string, id: number): Observable<T> {
    const url = `${this.baseUrl}${modelName}/${id}`;

    return this.http.delete<T>(url, httpOptions)
      .pipe(catchError(this.handleError<T>('delete')));
  }

  /** PUT: update the hero on the server */
  update<T> (model: T, modelName:string): Observable<any> {
    return this.http.put(`${this.baseUrl}${modelName}`, model, httpOptions).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


