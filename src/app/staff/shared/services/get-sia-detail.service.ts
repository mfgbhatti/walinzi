import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class GetSiaDetailService {
  baseUrl: string =
    'https://services.sia.homeoffice.gov.uk/PublicRegister/SearchPublicRegisterByLicence';

  constructor(private readonly http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  get(number: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Origin': 'x-requested-with, x-requested-by',
        'Access-Control-Allow-Origin': '*'
      }),
    };
    // this.http
    //   .post(this.baseUrl, { LicenseNo: number }, httpOptions).pipe(catchError(this.handleError))
    //   .subscribe((res) => console.log(res));
    console.log('under construction HTTP')
  }
}
