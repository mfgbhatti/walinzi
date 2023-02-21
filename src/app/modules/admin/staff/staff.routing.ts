import { Route } from '@angular/router';
import { CanDeactivateItemsDetails } from '@modules/admin/clients/clients.guards';
import { ItemResolver, ItemsResolver } from '@modules/admin/clients/clients.resolvers';
import { ClientsComponent } from '@modules/admin/clients/clients.component';
import { ListComponent } from '@modules/admin/clients/list/list.component';
import { DetailsComponent } from '@modules/admin/clients/details/details.component';

export const ClientsRoutes: Route[] = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          items: ItemsResolver,
        },
        children: [
          {
            path: ':id',
            component: DetailsComponent,
            resolve: {
              item: ItemResolver,
            },
            canDeactivate: [CanDeactivateItemsDetails]
          }
        ]
      }
    ]
  }
];
