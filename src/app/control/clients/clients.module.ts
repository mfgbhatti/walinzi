import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import {
  FormComponent,
  ListComponent,
  DetailsComponent,
  TabDetailComponent,
  TabNoteComponent,
  TabSitesComponent,
  TabDetailFormComponent,
  ContactFormComponent,
  TabNotesFormComponent
} from 'src/app/control/clients';
import { MaterialModule } from 'src/app/_shared';


@NgModule({
  declarations: [
    ClientsComponent,
    ListComponent,
    FormComponent,
    DetailsComponent,
    TabNoteComponent,
    TabSitesComponent,
    TabDetailComponent,
    TabNotesFormComponent,
    TabDetailFormComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class ClientsModule { }
