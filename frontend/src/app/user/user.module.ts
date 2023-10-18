import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { MatTooltipModule } from '@angular/material/tooltip';
// Copy to clipboard
import { ClipboardModule } from '@angular/cdk/clipboard';

import { ClientUserComponent } from "./feature/user.component";
import { ClientUserRoutingModule } from "./user-routing.module";
import { CreateUserComponent } from "./ui/create/create.component";
import { ActivateUserComponent } from "./ui/activate/activate.component";

@NgModule({
  declarations: [
    ClientUserComponent,
    CreateUserComponent,
    ActivateUserComponent,
  ],
  imports: [
    CommonModule,
    ClientUserRoutingModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule

  ]
})

export class ClientUserModule { }