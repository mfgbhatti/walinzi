import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ShiftListComponent } from './feature/list/list.component';
import { ShiftRoutingModule } from './shift-routing.module';
import { CreateShiftComponent } from './ui/create/create.component';

@NgModule({
  declarations: [ShiftListComponent, CreateShiftComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShiftRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ShiftModule {}
