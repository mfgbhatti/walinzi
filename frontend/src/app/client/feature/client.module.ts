import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';

import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from '../ui/create/create.component';
import { ClientComponent } from './client.component';



@NgModule({
  declarations: [
    ClientComponent,
    CreateClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule
  ]
})
export class ClientModule { }
