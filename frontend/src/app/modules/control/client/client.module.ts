import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ClientComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ClientModule {}
