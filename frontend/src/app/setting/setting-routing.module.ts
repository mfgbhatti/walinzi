import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserProfileComponent } from "./ui/profile/profile.component";


const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    title: 'Walinzi - User Profile'
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SettingRoutingModule { }