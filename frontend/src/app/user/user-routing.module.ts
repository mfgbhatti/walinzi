import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientUserComponent } from "./feature/user.component";
import { ActivateUserComponent } from "./ui/activate/activate.component";

const routes: Routes = [
  {
    path: '',
    component: ClientUserComponent,
    title: 'Walinzi - Users',

  },
  {
    path: 'activate/:user_id/:activation_key',
    component: ActivateUserComponent,
    title: 'Walinzi - User Activation',
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ClientUserRoutingModule { }