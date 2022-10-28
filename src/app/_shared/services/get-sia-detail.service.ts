import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetSiaDetailService {
  constructor(private readonly http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  get(data: string): Observable<any> {
    const baseUrl = '/api';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0',
      }),
      responseType: 'text' as const,
    };

    return this.http
      .post(baseUrl, 'LicenseNo=' + data, httpOptions)
      .pipe(catchError(this.handleError))
      // .subscribe((data) => {
      //   const new_data = data.replace(/<(?:.|\n)*?>/gm, '');
      //   console.log(new_data);
      // });
  }
}
