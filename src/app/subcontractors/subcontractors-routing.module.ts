import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcontractorComponent } from './subcontractors.component';
import { SubDetailComponent } from 'src/app/subcontractors'

const routes: Routes = [
  { path: '', component: SubcontractorComponent, title: 'Walinzi - Subcontractors' },
  { path: 'sub-details/:id', component: SubDetailComponent, title: 'Walinzi - Sites Details' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractorRoutingModule { }
