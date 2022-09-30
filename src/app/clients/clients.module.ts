import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import {
  ClientsService,
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
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    ClientsComponent,
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
    MaterialModule
  ],
  providers: [ClientsService, ClientDetailsService],
})
export class ClientsModule { }
