import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftComponent } from './feature/shift.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftComponent,
    title: 'Walinzi - Shifts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
