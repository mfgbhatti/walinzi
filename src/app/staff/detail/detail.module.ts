import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailRoutingModule } from './detail-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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
  BankFormComponent
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
    BankFormComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},]
})
export class DetailModule {}
