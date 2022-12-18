import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { FuseModule } from '@fuse/fuse.module';
import { FuseConfigModule } from '@fuse/services/config';
import { appConfig } from '@core/config/app.config';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // fuse modules
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    CoreModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
