import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';
import {
  StaffComponent,
  ListComponent,
  FormComponent,
} from 'src/app/staff';
import { MaterialModule } from 'src/app/_shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StaffComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class StaffModule {}
