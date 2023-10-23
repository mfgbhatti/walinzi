import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SettingRoutingModule } from "./setting-routing.module";
import { UserProfileComponent } from "./ui/profile/profile.component";

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ],
  exports: []

})

export class SettingModule { }