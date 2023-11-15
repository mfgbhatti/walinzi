import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientUserComponent } from "./feature/user.component";
import { ActivateUserComponent } from "./ui/activate/activate.component";
import { AuthGuard } from "../auth/gaurds/auth.guard";
import { NoAuthGuard } from "../auth/gaurds/noAuth.guard";

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: ClientUserComponent,
    title: 'Walinzi - Users',

  },
  {
    canActivate: [NoAuthGuard],
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