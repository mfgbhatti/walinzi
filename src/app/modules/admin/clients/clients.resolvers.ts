import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ContactsService as DataService } from '@modules/admin/clients/clients.service';
import { Contact as DataType } from '@modules/admin/clients/clients.types';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<any>
{
  constructor(private readonly _dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataType[]> {
    return this._dataService.getitems();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<any>
{
  /**
   * Constructor
   */
  constructor(
    private _dataService: DataService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataType> {
    return this._dataService.getItemById(route.paramMap.get('id'))
      .pipe(
        // Error here means the requested contact is not available
        catchError((error) => {

          // Log the error
          console.error(error);

          // Get the parent url
          const parentUrl = state.url.split('/').slice(0, -1).join('/');

          // Navigate to there
          this._router.navigateByUrl(parentUrl);

          // Throw an error
          return throwError(error);
        })
      );
  }
}
