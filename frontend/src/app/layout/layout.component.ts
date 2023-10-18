import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntil, map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from 'src/app/auth/data-access/auth.services';
import { Destroy } from '@shared/utils/destroy';

@Component({
  standalone: true,
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [NgIf, CommonModule, MatToolbarModule, MatButtonModule],
  providers: [Destroy, AuthService],
})
export class LayoutComponent implements OnInit {
  private _authService = inject(AuthService);
  private _destroy = inject(Destroy);
  private _changeDetectRef = inject(ChangeDetectorRef);
  isLogedIn!: boolean;

  ngOnInit(): void {
    this.showToolbar();

  }

  showToolbar() {
    this._authService.check().pipe(takeUntil(this._destroy), map((b) => this.isLogedIn = b)).subscribe();
    this._changeDetectRef.detectChanges();
  }
}
