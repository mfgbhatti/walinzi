import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // SuperAdmin
  {
    path: 'client', loadChildren: () => import('./client/client.module').then(module => module.ClientModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.ClientUserModule),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
