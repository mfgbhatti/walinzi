import { Component, inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from 'src/app/auth/data-access/auth.services';
import { Destroy } from '@shared/utils/destroy';
import { AuthUtils } from '../auth/util/auth.util';

@Component({
  standalone: true,
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, CommonModule, RouterModule, MatMenuModule],
  providers: [Destroy, AuthService],
})
export class LayoutComponent implements OnInit {
  private _authService = inject(AuthService);
  private _destroy = inject(Destroy);
  // change it to false
  isLogedIn: boolean = false;
  _accessToken: string | null = null;

  ngOnInit(): void {
    this._accessToken = this._authService.accessToken;
    this.isLogedIn = !AuthUtils.isTokenExpired(this._accessToken);
  }

  signOut() {
    this._authService.signOut().pipe(takeUntil(this._destroy)).subscribe();
    this.isLogedIn = false;
  }
}
