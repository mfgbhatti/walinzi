import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';

import {
  ClientsComponent,
  SitesComponent,
  ClientDetailsComponent,
  ClientListComponent,
  ClientFormComponent,
} from 'src/app/clients';
import { ClientsRoutingModule } from './clients-routing.module';
import { MatButtonModule } from '@angular/material/button';


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
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule
  ]
})
export class ClientsModule { }
