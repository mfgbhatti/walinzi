import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ]
})
export class ClientModule {}
