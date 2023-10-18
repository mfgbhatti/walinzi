import { Component, OnInit, inject } from '@angular/core';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { Destroy } from '@shared/utils/destroy';
import { AuthService } from 'src/app/auth/data-access/auth.services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [Destroy]
})
export class LogoutComponent implements OnInit {
  countdown: number = 10;
  countdownMapping: any = {
    '=1': '# second',
    'other': '# seconds',
  };

  private _authService = inject(AuthService)
  private _destroy = inject(Destroy)
  private _router = inject(Router)

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
        takeUntil(this._destroy),
        tap(() => this.countdown--),
      )
      .subscribe();
  }

}
