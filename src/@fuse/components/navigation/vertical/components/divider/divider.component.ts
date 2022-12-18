import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { FuseVerticalNavigationComponent } from '@fuse/components/navigation/vertical/vertical.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-vertical-navigation-divider-item',
  templateUrl: './divider.component.html',
  providers: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuseVerticalNavigationDividerItemComponent implements OnInit {
  @Input() item!: FuseNavigationItem;
  @Input() name!: string;

  private _fuseVerticalNavigationComponent!: FuseVerticalNavigationComponent;

  /**
   * Constructor
   */
  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fuseNavigationService: FuseNavigationService,
    private readonly _unsubscribeAll: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._fuseVerticalNavigationComponent =
      this._fuseNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._fuseVerticalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
}
