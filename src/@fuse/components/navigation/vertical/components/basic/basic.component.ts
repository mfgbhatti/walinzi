import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FuseVerticalNavigationComponent } from '@fuse/components/navigation/vertical/vertical.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  providers: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuseVerticalNavigationBasicItemComponent implements OnInit {
  @Input() item!: FuseNavigationItem;
  @Input() name!: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _fuseVerticalNavigationComponent!: FuseVerticalNavigationComponent;

  /**
   * Constructor
   */
  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fuseNavigationService: FuseNavigationService,
    private readonly _fuseUtilsService: FuseUtilsService,
    private readonly _unsubscribeAll: Destroy
  ) {
    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._fuseUtilsService.exactMatchOptions
        : this._fuseUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._fuseVerticalNavigationComponent =
      this._fuseNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Subscribe to onRefreshed on the navigation component
    this._fuseVerticalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
}
