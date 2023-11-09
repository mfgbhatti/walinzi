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
import { MatSelectModule } from '@angular/material/select';
import { LocationComponent } from './feature/location.component';
import { CreateLocationComponent } from './ui/create/create.component';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [LocationComponent, CreateLocationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LocationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
})
export class LocationModule {}
