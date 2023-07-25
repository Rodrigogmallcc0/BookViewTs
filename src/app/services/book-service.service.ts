import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { LibroModel} from '../model/libro';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private baseUrl = environment.localUrl;

  constructor(private httpclient: HttpClient) { }

  getAll(){
    return this.httpclient.get<LibroModel>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        this.handleError(error);
        return EMPTY;
      })
      );
  }
  getAllActive(): Observable<LibroModel[]>{
    return this.httpclient.get<LibroModel[]>(`${this.baseUrl}/active`).pipe(map(res=> res));
  }
  saveBook(request: any):Observable<any>  {
    return this.httpclient.post<any>(`${this.baseUrl}/save`, request).pipe(map(res => res));
  }
  updateBook(request: any): Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}/update`, request).pipe(map(res => res));
  }

  deleteBook(id: number | string, entity: Partial<LibroModel>):Observable<any>{
    return this.httpclient
    .patch<LibroModel>(`${this.baseUrl}/delete/${id}`, entity,{
      reportProgress: true,
      observe:'events',
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (typeof error === 'string') {
      errorMessage = error;
    } else {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${error.status}, with body ${error.message}`;
      }
    }
    console.error(error);
    // return an ErrorObservable with a user-facing error message
    return throwError(errorMessage);
  }
}
