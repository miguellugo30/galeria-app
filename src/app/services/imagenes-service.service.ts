import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Imagen, Imagenes } from '../interface/imagenes';

@Injectable({
  providedIn: 'root'
})
export class ImagenesServiceService {

  private urlApi: string = 'http://127.0.0.1:8000/api';
  private user: string = 'user_api@api.com';
  private password: string = 'password';
  private httpOption: any;

  constructor( private http: HttpClient ) { }

  login(): Observable<any> {
    return this.http.post<{token: string}>(this.urlApi+'/login', { email: this.user, password: this.password })
    .pipe(
      catchError(this.errorHandler),
      map( result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
  }

  getImagenes(): Observable<HttpEvent<Imagenes[]>>{

    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('acces_token')
      })
    };

    return this.http.get<Imagenes[]>( this.urlApi+'/imagenes', this.httpOption)
                      .pipe(
                        map((response) => response as HttpEvent<Imagenes[]> )
                      )
  }

  sendImagen( data: any ): Observable<any> {

    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        Authorization: 'Bearer ' + localStorage.getItem('acces_token')
      })
    };

    return this.http.post<any>(this.urlApi+'/imagenes', data, this.httpOption)
                    .pipe(
                      catchError(this.errorHandler),
                      map( result => {
                        console.log(result);

                      } )
                    );
  }


  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
