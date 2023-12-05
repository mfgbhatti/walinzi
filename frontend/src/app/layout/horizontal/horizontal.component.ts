import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  standalone: true,
  selector: 'horizontal-layout',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  imports: [
    NgIf,
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class HorizontalLayoutComponent {

  constructor() {
  }
}
