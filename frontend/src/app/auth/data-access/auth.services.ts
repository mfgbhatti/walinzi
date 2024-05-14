import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { UserService } from 'src/app/user/data-access/user.service';
import { Enviroment } from 'src/enviroments';
import { AuthUtils } from '../util/auth.util';
import { User } from '@shared/interfaces/user.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = Enviroment.urls.auth;
  // private _authenticated: boolean = false;

  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);
  private _router = inject(Router);

  /**
   * Constructor
   */
  constructor() {}

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

  set loginUser(user: User) {
    localStorage.setItem('loginUser', JSON.stringify(user));
  }

  get loginUser(): User {
    return JSON.parse(localStorage.getItem('loginUser') ?? '');
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
    // // Throw error, if the user is already logged in
    // if (this._authenticated) {
    //   return throwError(() => 'User is already logged in.');
    // }

    return this._httpClient.post(this.baseUrl + 'sign-in/', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.access;
        this.loginUser = response.user;

        // // Set the authenticated flag to true
        // this._authenticated = true;

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
          this.clearLocalStorage();
          this._router.navigate(['sign-in']);
        }

        // this._authenticated = false;
        // Return true
        return of(true);
      })
    );
  }

  /**
   * Sign in using the access token
   */
  refreshToken(): Observable<boolean> {
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
        // // Set the authenticated flag to true
        // this._authenticated = true;

        // Return true
        return of(true);
      })
    );
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // // Check if the user is logged in
    // if (this._authenticated) {
    //   return of(true);
    // }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (!AuthUtils.isTokenExpired(this.accessToken)) {
      return of(true);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.refreshToken();
  }

  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loginUser');
  }
}
