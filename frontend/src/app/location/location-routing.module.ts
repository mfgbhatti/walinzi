import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from './feature/location.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    title: 'Walinzi - Locations',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule { }