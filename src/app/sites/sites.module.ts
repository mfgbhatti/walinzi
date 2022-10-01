import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
} from 'src/app/sites';
import { SiteService } from 'src/app/sites/shared';
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
    SiteTabTimesheetComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    SiteService
  ]
})
export class SitesModule { }
