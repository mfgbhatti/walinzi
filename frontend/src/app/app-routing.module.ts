import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/gaurds/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // Go to login page if no other routes match
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },

  // Redirect signed-in user to the '/dashboards/project'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'setting/profile',
  },

  // SuperAdmin
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: { layout: 'horizontal' },
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then(
            (module) => module.ClientModule
          ),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.module').then(
            (module) => module.CustomerModule
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./guard/guard.module').then((module) => module.GuardModule),
      },
      {
        path: 'shift',
        loadChildren: () =>
          import('./shift/shift.module').then((module) => module.ShiftModule),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./location/location.module').then(
            (module) => module.LocationModule
          ),
      },
      {
        path: 'subcontractor',
        loadChildren: () =>
          import('./subcontractor/subcontractor.module').then(
            (module) => module.SubcontractorModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },
  {
    // No auth guard here, it is implemented in the module
    path: 'user',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    loadChildren: () =>
      import('./user/user.module').then((m) => m.ClientUserModule),
  },
  {
    // No auth guard here, it is implemented in the module
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
