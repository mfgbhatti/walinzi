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
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import {
  ClientsService,
  SitesComponent,
  ClientFormComponent,
  ClientListComponent,
  ClientDetailsService,
  ClientDetailsComponent,
  ClientTabDetailComponent,
  ClientTabNoteComponent,
  ClientTabSitesComponent,
  ClientTabDetailFormComponent,
  ClientTabContactFormComponent,
  ClientTabNotesFormComponent
} from 'src/app/clients';


@NgModule({
  declarations: [
    ClientsComponent,
    SitesComponent,
    ClientListComponent,
    ClientFormComponent,
    ClientTabNoteComponent,
    ClientDetailsComponent,
    ClientTabSitesComponent,
    ClientTabDetailComponent,
    ClientTabNotesFormComponent,
    ClientTabDetailFormComponent,
    ClientTabContactFormComponent,
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
  ],
  providers: [ClientsService, ClientDetailsService],
})
export class ClientsModule { }
