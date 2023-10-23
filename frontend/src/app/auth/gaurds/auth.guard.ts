import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { AuthService } from '../data-access/auth.services';


export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService).check().pipe(
    switchMap((authenticated) => {
      console.log(authenticated)
      // If the user is not authenticated...
      if (!authenticated) {
        // Redirect to the sign-in page with a redirectUrl param
        const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
        const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
        console.log(authenticated)
        return of(urlTree);
      }
      console.log(authenticated)
      // Allow the access
      return of(true);
    }),
  );
};