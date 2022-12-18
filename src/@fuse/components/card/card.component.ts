import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { fuseAnimations } from '@fuse/animations';
import { FuseCardFace } from '@fuse/components/card/card.types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  exportAs: 'fuseCard',
})
export class FuseCardComponent implements OnChanges {
  static ngAcceptInputType_expanded: BooleanInput;
  static ngAcceptInputType_flippable: BooleanInput;

  @Input() expanded = false;
  @Input() face: FuseCardFace = 'front';
  @Input() flippable = false;

  /**
   * Constructor
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
      'fuse-card-expanded': this.expanded,
      'fuse-card-face-back': this.flippable && this.face === 'back',
      'fuse-card-face-front': this.flippable && this.face === 'front',
      'fuse-card-flippable': this.flippable,
    };
    /* eslint-enable @typescript-eslint/naming-convention */
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Expanded
    if ('expanded' in changes) {
      // Coerce the value to a boolean
      this.expanded = coerceBooleanProperty(changes['expanded'].currentValue);
    }

    // Flippable
    if ('flippable' in changes) {
      // Coerce the value to a boolean
      this.flippable = coerceBooleanProperty(changes['flippable'].currentValue);
    }
  }
}
