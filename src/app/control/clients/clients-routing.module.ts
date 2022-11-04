import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { DetailsComponent } from './detail/details.component';

const routes: Routes = [
  { path: '', component: ClientsComponent, title: 'Walinzi - Clients' },
  {
    path: 'client-details/:id',
    component: DetailsComponent,
    title: 'Walinzi - Client Details',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
