import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientUserComponent } from "./feature/user.component";

const routes: Routes = [
  {
    path: '',
    component: ClientUserComponent,
    title: 'Walinzi - Users',

  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ClientUserRoutingModule { }