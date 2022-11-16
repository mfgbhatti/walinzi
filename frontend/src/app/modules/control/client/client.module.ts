import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ClientComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    SharedModule,
  ],
})
export class ClientModule {}
