import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./ui/login/login.component";
import { LogoutComponent } from "./ui/logout/logout.component";


const routes: Routes = [
  {
    path: 'sign-in',
    component: LoginComponent,
    title: 'Walinzi - Sign in',
  },
  {
    path: 'sign-out',
    component: LogoutComponent,
    title: 'Walinzi - Sign out'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PublicRoutingModule { }