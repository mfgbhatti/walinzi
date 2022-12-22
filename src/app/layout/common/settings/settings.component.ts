import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfigService } from '@core/config/app.config.service';
import {
  AppConfig,
  Scheme,
  Theme,
  Themes,
} from '@fuse/services/config/config.types';
import { Layout } from '@layout/layout.types';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }

      @media (screen and min-width: 1280px) {
        empty-layout + settings .settings-cog {
          right: 0 !important;
        }
      }
    `,
  ],
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  config!: AppConfig;
  layout!: Layout;
  scheme!: 'dark' | 'light';
  theme!: string;
  themes!: Themes;

  /**
   * Constructor
   */
  constructor(
    private readonly _router: Router,
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _appConfigService: AppConfigService,
    private readonly _unsubscribeAll: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;
      });

      // this._appConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
      //   this.config = config;
      //   console.log(config)
      // });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._fuseConfigService.config = { layout } as AppConfig;
      });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme } as AppConfig;
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme } as AppConfig;
  }
}
