import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { ControlComponent } from './control.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [ControlComponent, NavBarComponent],
  imports: [CommonModule, ControlRoutingModule],
})
export class ControlModule {}
