import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { ShiftListComponent } from './feature/list/list.component';
import { ShiftRoutingModule } from './shift-routing.module';
import { CreateShiftComponent } from './ui/create/create.component';
import { ShiftCalendarComponent } from './feature/calendar/caldendar.component';

@NgModule({
  declarations: [
    ShiftListComponent,
    CreateShiftComponent,
    ShiftCalendarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShiftRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule
  ],
})
export class ShiftModule {}
