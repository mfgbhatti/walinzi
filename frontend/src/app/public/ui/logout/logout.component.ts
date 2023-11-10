import { Component, OnInit, inject } from '@angular/core';
import { finalize, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { Router } from '@angular/router';

import { Destroy } from '@shared/utils/destroy';
import { AuthService } from 'src/app/auth/data-access/auth.services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [Destroy],
})
export class LogoutComponent implements OnInit {
  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# second',
    other: '# seconds',
  };

  private _authService = inject(AuthService);
  private _destroy = inject(Destroy);

  ngOnInit(): void {
    // Sign out

    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._authService
            .signOut()
            .pipe(takeUntil(this._destroy))
            .subscribe();
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._destroy),
        tap(() => this.countdown--)
      )
      .subscribe();
  }
}
