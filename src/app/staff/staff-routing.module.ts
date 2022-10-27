import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  { path: '', component: StaffComponent, title: 'Walinzi - Staff' },
  {
    path: 'staff-details/:id',
    loadChildren: () =>
      import('./detail/detail.module').then((d) => d.DetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
