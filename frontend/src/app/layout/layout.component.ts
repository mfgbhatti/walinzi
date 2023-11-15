import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from 'src/app/auth/data-access/auth.services';

@Component({
  standalone: true,
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [AuthService],
})
export class LayoutComponent {
  _authService = inject(AuthService);
  // change it to false
  isLogedIn$!: Observable<boolean>;
}
