import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { DetailRoutingModule } from './detail-routing.module';
import {
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
  OriginComponent,
  AddressComponent,
  BankDetailComponent,
  PassportComponent,
  ExtraDocumentComponent,
  VettingInfoComponent,
  OriginFormComponent,
  AddressFormComponent,
  BankFormComponent,
  VettingFormComponent,
  PassportFormComponent,
  DocumentFormComponent,
  SiaDetailComponent
} from 'src/app/control/staff/detail';
import { ContactFormComponent } from '../shared';
import { MaterialModule } from 'src/app/_shared';
import { LicenceFormComponent } from './shared/forms/licence-form/licence-form.component';
import { EmploymentFormComponent } from './shared/forms/employment-form/employment-form.component';
import { EmploymentComponent } from './background/employment/employment.component';




@NgModule({
  declarations: [
    DetailComponent,
    ContactFormComponent,
    InfoComponent,
    NotesComponent,
    PreferredSitesComponent,
    ExpertiseComponent,
    BackgroundComponent,
    HealthComponent,
    VettingComponent,
    DocumentsComponent,
    TimesheetsComponent,
    OriginComponent,
    AddressComponent,
    BankDetailComponent,
    PassportComponent,
    ExtraDocumentComponent,
    VettingInfoComponent,
    OriginFormComponent,
    AddressFormComponent,
    BankFormComponent,
    VettingFormComponent,
    PassportFormComponent,
    DocumentFormComponent,
    SiaDetailComponent,
    LicenceFormComponent,
    EmploymentFormComponent,
    EmploymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DetailRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},]
})
export class DetailModule {}
