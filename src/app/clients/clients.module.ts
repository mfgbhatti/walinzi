import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

import {
  ClientsComponent,
  SitesComponent,
  ClientDetailsComponent,
  ClientListComponent,
  ClientFormComponent,
} from 'src/app/clients';
import { ClientsRoutingModule } from './clients-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ClientsComponent,
    SitesComponent,
    ClientDetailsComponent,
    ClientListComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule
  ]
})
export class ClientsModule { }
