import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { UserService } from 'src/app/user/data-access/user.service';
import { Enviroment } from 'src/enviroments';
import { AuthUtils } from '../util/auth.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = Enviroment.urls.auth;
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }

    return this._httpClient.post(this.baseUrl + 'sign-in/', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.access;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        this._userService.user = response.user;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<boolean> {
    return this._httpClient.post(this.baseUrl + 'sign-out/', {}).pipe(
      catchError(() =>
        // Return false
        of(false)
      ),
      switchMap((response: any) => {
        if (response.success) {
          localStorage.removeItem('accessToken');
        }

        this._authenticated = false;
        // Return true
        return of(true);
      })
    );
  }

  /**
   * Sign in using the access token
   */
  refreshToken(): Observable<boolean> {
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      // Sign in using the token
      return this._httpClient.post(this.baseUrl + 'refresh/', {}).pipe(
        catchError(() =>
          // Return false
          of(false)
        ),
        switchMap((response: any) => {
          if (response.access) {
            this.accessToken = response.access;
          }
          // Set the authenticated flag to true
          this._authenticated = true;

          // Return true
          return of(true);
        })
      );
    }
    return of(false)
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.refreshToken();
  }
}
