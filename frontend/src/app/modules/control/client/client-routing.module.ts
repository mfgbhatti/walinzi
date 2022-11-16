import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientsResolver } from './client.resolvers';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    title: 'Walinzi - Clients',
    resolve: { task: ClientsResolver },
    children: [
      {
        path: '',
        component: ListComponent,
        children: [{ path: '', component: DetailComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
