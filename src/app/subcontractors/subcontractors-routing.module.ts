import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcontractorsComponent } from './subcontractors.component';

const routes: Routes = [
  {path: '', component: SubcontractorsComponent, title: 'Walinzi - Subcontractors'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractorsRoutingModule { }
