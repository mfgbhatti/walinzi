import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteDetailComponent } from './site-detail/site-detail.component';

import { SitesComponent } from './sites.component';

const routes: Routes = [
  {path: '', component: SitesComponent, title: 'Walinzi - Sites'},
  {path: 'site-details/:id', component:SiteDetailComponent, title: 'Walinzi - Sites Details'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }