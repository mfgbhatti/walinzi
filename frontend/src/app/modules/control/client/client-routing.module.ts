import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientResolver, ClientsResolver } from './client.resolvers';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    title: 'Walinzi - Clients',
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: { task: ClientsResolver },
        children: [
          {
            path: ':id',
            component: DetailComponent,
            resolve: { task: ClientResolver },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
