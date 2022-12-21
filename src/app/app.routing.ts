import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

import { NoAuthGuard } from '@core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },
    // Landing routes
    {
      path: '',
      component: LayoutComponent,
      data: {
          layout: 'empty'
      },
      children: [
          {path: 'home', loadChildren: () => import('@modules/home/home.module').then(m => m.LandingHomeModule)},
      ]
  },

  // Auth routes for guests
  {
    path: '',
    canMatch: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('@modules/auth/forgot-password/forgot-password.module').then(
            (m) => m.AuthForgotPasswordModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('@modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('@modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
    ],
  },
  // Auth routes for authenticated users
  {
    path: '',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('@modules/auth/sign-out/sign-out.module').then(
            (m) => m.AuthSignOutModule
          ),
      },
    ],
  },
  // admin routes
      // Admin routes
      {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        // resolve: {
        //     initialData: InitialDataResolver,
        // },
        children: [
            {path: 'example', loadChildren: () => import('@modules/admin/example/example.module').then(m => m.ExampleModule)},
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
