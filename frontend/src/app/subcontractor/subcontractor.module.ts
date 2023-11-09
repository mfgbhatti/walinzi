import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubcontractorComponent } from './feature/subcontractor.component';
import { CreateSubcontractorComponent } from './ui/create/create.component';
import { SubcontractorRoutingModule } from './subcontractor-routing.module';





@NgModule({
  declarations: [
    SubcontractorComponent,
    CreateSubcontractorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubcontractorRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SubcontractorModule { }
