import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientService } from './client.service';
import { Client } from './client.types';

@Injectable({ providedIn: 'root' })
export class ClientsResolver implements Resolve<any> {
  constructor(private readonly _clientService: ClientService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client[]> {
    return this._clientService.getAll();
  }
}

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<any> {
  constructor(
    private readonly _clientService: ClientService,
    private readonly _router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {
    return this._clientService
      .getClientById(route.paramMap.get('id') as string)
      .pipe(
        catchError((error) => {
          console.log(error);
          const parentUrl = state.url.split('/').slice(0, 1).join('/');
          this._router.navigateByUrl(parentUrl);
          return throwError(error);
        })
      );
  }
}
