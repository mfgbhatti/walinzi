import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubcontractorRoutingModule } from './subcontractors-routing.module';
import { SubcontractorComponent } from './subcontractors.component'
import {
  SubListComponent,
  SubFormComponent,
  SubDetailComponent
} from 'src/app/subcontractors';
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    SubcontractorComponent,
    SubListComponent,
    SubFormComponent,
    SubDetailComponent
  ],
  imports: [
    CommonModule,
    SubcontractorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SubcontractorsModule { }
