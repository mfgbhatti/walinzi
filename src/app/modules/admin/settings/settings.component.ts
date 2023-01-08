import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Destroy } from '@fuse/services/utils/destroy';
import { User } from '@core/user/user.types';
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'profile';
  allowedPanels: string[] = [];

  // user
  user!: User;
  members!: User[];
  role!: string;

  /**
   * Constructor
   */
  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fuseMediaWatcherService: FuseMediaWatcherService,
    private readonly _userService: UserService,
    private readonly _unsubscribeAll: Destroy
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
          user.groups.forEach((group) => {
            this.role = group.name;
          });
          switch (this.role) {
            case 'superuser':
              this.allowedPanels = [
                'profile',
                'security',
                'notifications',
                'plan-billing',
                'team',
              ];
              break;
            case 'admin':
              this.allowedPanels = [
                'profile',
                'security',
                'notifications',
                'team',
              ];
              break;
            default:
              this.allowedPanels = [
                'profile',
                'security',
                'notifications',
              ];
              break;
          }
        }
      });
    this._userService
      .getUsers(this.user.customerId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((users: User[]) => {
        this.members = users;
      });
    // Setup available panels
    this.panels = [
      {
        id: 'profile',
        icon: 'heroicons_outline:user-circle',
        title: 'Profile',
        description:
          'Manage Name, title and other personal information',
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Security',
        description:
          'Manage your password and 2-step verification preferences',
      },
      {
        id: 'notifications',
        icon: 'heroicons_outline:bell',
        title: 'Notifications',
        description: "Manage when you'll be notified of new activity",
      },
      {
        id: 'team',
        icon: 'heroicons_outline:user-group',
        title: 'Team',
        description:
          'Manage your existing team and change roles/permissions',
      },
      {
        id: 'plan-billing',
        icon: 'heroicons_outline:credit-card',
        title: 'Plan & Billing',
        description:
          'Manage your subscription plan, payment method and billing information',
      },
    ];

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        } else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find((panel) => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
