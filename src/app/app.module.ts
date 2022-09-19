import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ClientsComponent, SitesComponent } from './clients';
import { StaffComponent } from './staff/staff.component';
import { SubcontractorsComponent } from './subcontractors/subcontractors.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    SitesComponent,
    StaffComponent,
    SubcontractorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
