import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SitesComponent } from './sites.component';

const routes: Routes = [
  {path: '', component: SitesComponent, title: 'Walinzi - Sites'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }