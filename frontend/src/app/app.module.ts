import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// my app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAuth } from './auth/util/auth.provider';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutComponent
  ],
  providers: [provideAuth()],
  bootstrap: [AppComponent]
})
export class AppModule { }
