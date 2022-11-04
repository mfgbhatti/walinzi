import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiaSearchComponent } from './sia-search/sia-search.component';

const routes: Routes = [
  {
    path: 'control',
    loadChildren: () =>
      import('./control/control.module').then(
        (control) => control.ControlModule
      ),
  },
  {
    path: 'sia/lisence-details',
    component: SiaSearchComponent,
    title: 'Walizi - SIA Lisence Details',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
