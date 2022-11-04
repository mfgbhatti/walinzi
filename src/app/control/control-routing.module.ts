import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control.component';

const routes: Routes = [
  {
    path: '',
    component: ControlComponent,
    title: 'Walizi - Control',
    pathMatch: 'full',
    children: [
      {
        path: 'clients',
        loadChildren: () =>
          import('./clients/clients.module').then((c) => c.ClientsModule),
        outlet: 'control',
      },
      {
        path: 'sites',
        loadChildren: () =>
          import('./sites/sites.module').then((s) => s.SitesModule),
        outlet: 'control',
      },
      {
        path: 'subcontractors',
        loadChildren: () =>
          import('./subcontractors/subcontractors.module').then(
            (sub) => sub.SubcontractorsModule
          ),
        outlet: 'control',
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((staff) => staff.StaffModule),
        outlet: 'control',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
