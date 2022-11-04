import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubcontractorRoutingModule } from './subcontractors-routing.module';
import { SubcontractorComponent } from './subcontractors.component'
import {
  SubListComponent,
  SubFormComponent,
  SubDetailComponent,
  TabDetailComponent,
  TabNotesComponent,
  TabStaffComponent,
  TabDocsComponent,
  TabTimesheetsComponent,
  TabSitesComponent
} from 'src/app/control/subcontractors';
import { MaterialModule } from 'src/app/_shared';




@NgModule({
  declarations: [
    SubcontractorComponent,
    SubListComponent,
    SubFormComponent,
    SubDetailComponent,
    TabDetailComponent,
    TabNotesComponent,
    TabStaffComponent,
    TabDocsComponent,
    TabTimesheetsComponent,
    TabSitesComponent
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
