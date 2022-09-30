import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

import {
  SiteListComponent,
  SiteFormComponent,
  SiteDetailComponent
} from 'src/app/sites';
import { SiteService } from 'src/app/sites/shared';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    SitesComponent,
    SiteListComponent,
    SiteFormComponent,
    SiteDetailComponent
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
