import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftListComponent } from './feature/list/list.component';
import { ShiftCalendarComponent } from './feature/calendar/caldendar.component';

const routes: Routes = [
  {
    path: 'list',
    component: ShiftListComponent,
    title: 'Walinzi - Shifts',
  },
  {
    path: 'calendar',
    component: ShiftCalendarComponent,
    title: 'Walinzi - Shifts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
