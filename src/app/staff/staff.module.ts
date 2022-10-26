import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';
import {
  StaffComponent,
  ListComponent,
  FormComponent,
  DetailComponent,
  InfoComponent,
  NotesComponent,
  PreferredSitesComponent,
  ExpertiseComponent,
  BackgroundComponent,
  HealthComponent,
  VettingComponent,
  DocumentsComponent,
  TimesheetsComponent,
  ContactFormComponent
} from 'src/app/staff';
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    StaffComponent,
    ListComponent,
    FormComponent,
    DetailComponent,
    InfoComponent,
    NotesComponent,
    PreferredSitesComponent,
    ExpertiseComponent,
    BackgroundComponent,
    HealthComponent,
    VettingComponent,
    DocumentsComponent,
    TimesheetsComponent,
    ContactFormComponent
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
