import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

import {
  SiteListComponent,
  SiteFormComponent,
  SiteDetailComponent
} from 'src/app/sites';
import { SiteService } from 'src/app/sites/shared';
import { MatNativeDateModule } from '@angular/material/core';


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
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    SiteService
  ]
})
export class SitesModule { }
