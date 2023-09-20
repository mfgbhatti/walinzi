import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './feature/list/client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    title: 'Walinzi - Clients',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }