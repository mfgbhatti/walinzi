import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../data-access/auth.services';
import { AuthUtils } from './auth.util';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const _authService = inject(AuthService);

  // Clone the request object
  let newReq = req.clone();

  // Request
  //
  // If the access token didn't expire, add the Authorization header.
  // We won't add the Authorization header if the access token expired.
  // This will force the server to return a "401 Unauthorized" response
  // for the protected API routes which our response interceptor will
  // catch and delete the access token from the local storage while logging
  // the user out from the app.
  if (
    _authService.accessToken &&
    !AuthUtils.isTokenExpired(_authService.accessToken)
  ) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + _authService.accessToken
      ),
    });
  }

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // At this stage, the token has expired, refresh cookie is expired
        // and user is no more authenticated. We cannot use authService to sign out
        // because user need to be authenticated to call signOut.
        // Instead we will clear local storage and redirect to sign-in page
        _authService.clearLocalStorage();

        // // Sign out
        // authService.signOut();

        // Reload the app
        location.reload();
      }

      return throwError(() => 'There is error intercepting http request.');
    })
  );
};
