import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from '@core/navigation/navigation.types';
import { NavigationService } from '@core/navigation/navigation.service';
import { User } from '@core/user/user.types';
import { UserService } from '@core/user/user.service';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'futuristic-layout',
  templateUrl: './futuristic.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
})
export class FuturisticLayoutComponent implements OnInit {
  isScreenSmall!: boolean;
  navigation!: Navigation;
  user!: User;

  /**
   * Constructor
   */
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _navigationService: NavigationService,
    private readonly _userService: UserService,
    private readonly _fuseMediaWatcherService: FuseMediaWatcherService,
    private readonly _fuseNavigationService: FuseNavigationService,
    private readonly _unsubscribeAll: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    // Subscribe to the user service
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }
}
