import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GenericService<T> {
  constructor(private http: HttpClient, @Inject('baseUrl') private baseUrl: string) {}

  getAll(id?: number): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(catchError(this.handleError('get', [])));
  }

  get(id?: number): Observable<T> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<T>(url)
      .pipe(catchError(this.handleError<T>('get')));
  }

  add(model: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, model, httpOptions)
      .pipe(catchError(this.handleError<T>('add'))
      );
  }

  /** DELETE: delete the hero from the server */
  delete(id: number): Observable<T> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<T>(url, httpOptions)
      .pipe(catchError(this.handleError<T>('delete')));
  }

  /** PUT: update the hero on the server */
  update(id: number, model: T): Observable<any> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put(url, model, httpOptions)
      .pipe(catchError(this.handleError('update')));
  }

  private handleError<TR> (operation = 'operation', result?: TR) {
    return (error: any): Observable<TR> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as TR);
    };
  }
}


