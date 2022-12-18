import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

import { NoAuthGuard } from '@core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
      // Auth routes for guests
      {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'forgot-password', loadChildren: () => import('@modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('@modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('@modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        ]
    },
        // Auth routes for authenticated users
        {
          path: '',
          canMatch: [AuthGuard],
          component: LayoutComponent,
          data: {
              layout: 'empty'
          },
          children: [
              {path: 'sign-out', loadChildren: () => import('@modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
          ]
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
