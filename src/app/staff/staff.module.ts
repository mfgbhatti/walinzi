import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';
import {
  StaffComponent,
  ListComponent,
  FormComponent,
  DetailComponent
} from 'src/app/staff';
import { MaterialModule } from 'src/app/_shared';

@NgModule({
  declarations: [
    StaffComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StaffModule { }
