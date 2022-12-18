import { Component, ViewEncapsulation } from '@angular/core';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
})
export class EmptyLayoutComponent {

  /**
   * Constructor
   */
  constructor(private readonly _destroy: Destroy) {}

}
