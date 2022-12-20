import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '@core/auth/auth.service';
import { Destroy } from '@fuse/services/utils/destroy';

export interface CountdownMapping {
  [key: string]: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'auth-sign-out',
  templateUrl: './sign-out.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignOutComponent implements OnInit {
  countdown = 5;
  countdownMapping: CountdownMapping = {
    '=1': '# second',
    other: '# seconds',
  };

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private readonly _unsubscribeAll: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Sign out
    this._authService.signOut();

    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigate(['sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }
}
