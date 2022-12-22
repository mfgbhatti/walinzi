import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from '@core/navigation/navigation.service';
import { UserService } from '@core/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private readonly _navigationService: NavigationService,
    private readonly _userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([this._navigationService.get(), this._userService.get()]);
  }
}
