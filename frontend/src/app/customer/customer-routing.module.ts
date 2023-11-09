import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './feature/customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    title: 'Walinzi - Customers',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }