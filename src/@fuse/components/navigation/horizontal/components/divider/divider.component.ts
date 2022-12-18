import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '@fuse/components/navigation/horizontal/horizontal.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-horizontal-navigation-divider-item',
  templateUrl: './divider.component.html',
  providers: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuseHorizontalNavigationDividerItemComponent implements OnInit {
  @Input() item!: FuseNavigationItem;
  @Input() name!: string;

  private _fuseHorizontalNavigationComponent!: FuseHorizontalNavigationComponent;

  /**
   * Constructor
   */
  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fuseNavigationService: FuseNavigationService,
    private readonly _destroy: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._fuseHorizontalNavigationComponent =
      this._fuseNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._fuseHorizontalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
}
