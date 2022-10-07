import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((c) => c.ClientsModule),
  },
  {
    path: 'sites',
    loadChildren: () =>
      import('./sites/sites.module').then((s) => s.SitesModule),
  },
  {
    path: 'subcontractors',
    loadChildren: () =>
      import('./subcontractors/subcontractors.module').then((sub) => sub.SubcontractorsModule)
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then( (staff) => staff.StaffModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
