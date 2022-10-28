import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailRoutingModule } from './detail-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
  VettingInfoComponent
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
    VettingInfoComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class DetailModule {}
