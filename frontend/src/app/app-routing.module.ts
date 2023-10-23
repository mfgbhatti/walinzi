import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/gaurds/auth.guard';
import { NoAuthGuard } from './auth/gaurds/noAuth.guard';

const routes: Routes = [

  // Go to login page if no other routes match
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },

  // Redirect signed-in user to the '/dashboards/project'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'setting/profile' },

  // SuperAdmin
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(module => module.ClientModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.ClientUserModule),

      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      }
    ]
  },
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
