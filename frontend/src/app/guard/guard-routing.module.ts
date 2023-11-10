import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardComponent } from './feature/guard.component';

const routes: Routes = [
  {
    path: '',
    component: GuardComponent,
    title: 'Walinzi - Staff',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardRoutingModule { }