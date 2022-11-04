import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

import {
  SiteListComponent,
  SiteFormComponent,
  SiteTabInfoComponent,
  SiteTabExtraComponent,
  SiteTabNotesComponent,
  SiteTabRateComponent,
  SiteTabStaffComponent,
  SiteTabDocsComponent,
  SiteTabTimesheetComponent,
  SiteDetailComponent,
  TabNotesFormComponent,
  TabExtraDetailFormComponent,
  TabContactPersonFormComponent,
  TabChargedRatesFormComponent,
  TabPayRatesFormComponent
} from 'src/app/control/sites';
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    SitesComponent,
    SiteListComponent,
    SiteFormComponent,
    SiteDetailComponent,
    SiteTabInfoComponent,
    SiteTabExtraComponent,
    SiteTabNotesComponent,
    SiteTabRateComponent,
    SiteTabStaffComponent,
    SiteTabDocsComponent,
    SiteTabTimesheetComponent,
    TabNotesFormComponent,
    TabExtraDetailFormComponent,
    TabContactPersonFormComponent,
    TabChargedRatesFormComponent,
    TabPayRatesFormComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class SitesModule { }
