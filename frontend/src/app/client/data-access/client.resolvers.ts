import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, take, mergeMap, EMPTY } from 'rxjs';
import { ClientService } from './client.service';

export const ClientsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const _clientService = inject(ClientService)

    switch (state.url) {
      case '/client':
        return _clientService.getAll()
          .pipe(
            take(1),
            mergeMap((clientData) => {
              if (clientData) {
                return of(clientData);
              } else {
                return EMPTY;
              }
            })
          )
      default:
        return EMPTY;
    }
  }
