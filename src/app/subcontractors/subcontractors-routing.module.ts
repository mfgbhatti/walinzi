import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcontractorComponent } from './subcontractors.component';

const routes: Routes = [
  {path: '', component: SubcontractorComponent, title: 'Walinzi - Subcontractors'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractorRoutingModule { }
