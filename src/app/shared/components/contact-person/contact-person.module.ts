import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPersonComponent } from './contact-person.component';
import { ContactPersonFormComponent } from './contact-person-form/contact-person-form.component';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    ContactPersonComponent,
    ContactPersonFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class ContactPersonModule { }
