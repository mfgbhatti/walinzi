import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './ui/login/login.component';
import { LogoutComponent } from './ui/logout/logout.component';
import { NoAuthGuard } from '../auth/gaurds/noAuth.guard';
import { AuthGuard } from '../auth/gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    component: LoginComponent,
    title: 'Walinzi - Sign in',
  },
  {
    path: 'sign-out',
    canActivate: [AuthGuard],
    component: LogoutComponent,
    title: 'Walinzi - Sign out',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
