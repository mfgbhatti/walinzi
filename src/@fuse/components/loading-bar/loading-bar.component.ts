import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs';
import { FuseLoadingService } from '@fuse/services/loading';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fuse-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'fuseLoadingBar',
})
export class FuseLoadingBarComponent implements OnChanges, OnInit {
  @Input() autoMode = true;
  mode!: 'determinate' | 'indeterminate';
  progress: number | null = 0;
  show = false;

  /**
   * Constructor
   */
  constructor(
    private _fuseLoadingService: FuseLoadingService,
    private readonly _destroy: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Auto mode
    if ('autoMode' in changes) {
      // Set the auto mode in the service
      this._fuseLoadingService.setAutoMode(
        coerceBooleanProperty(changes['autoMode'].currentValue)
      );
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the service
    this._fuseLoadingService.mode$
      .pipe(takeUntil(this._destroy))
      .subscribe((value) => {
        this.mode = value;
      });

    this._fuseLoadingService.progress$
      .pipe(takeUntil(this._destroy))
      .subscribe((value) => {
        this.progress = value;
      });

    this._fuseLoadingService.show$
      .pipe(takeUntil(this._destroy))
      .subscribe((value) => {
        this.show = value;
      });
  }
}
