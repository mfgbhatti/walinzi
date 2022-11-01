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
} from 'src/app/staff/detail';
import { ContactFormComponent } from '../shared';
import { MaterialModule } from 'src/app/_shared';




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
    SiaDetailComponent
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
