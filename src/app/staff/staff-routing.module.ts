import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  { path: '', component: StaffComponent, title: 'Walinzi - Staff'},
  { path: 'staff-details/:id', component:DetailComponent, title: 'Walinzi - Staff Details'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
