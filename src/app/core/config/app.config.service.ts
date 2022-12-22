import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import {
  AppConfig,
  Scheme,
  Theme,
  Themes,
} from '@fuse/services/config/config.types';
import { Layout } from '@layout/layout.types';
import { FuseConfigService } from '@fuse/services/config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  config!: AppConfig;
  layout!: Layout;
  scheme!: 'dark' | 'light';
  theme!: string;
  themes!: Themes;

  private configProvider: BehaviorSubject<AppConfig>;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _router: Router
  ) {
    this.configProvider = new BehaviorSubject<AppConfig>(this.config);
  }

  set configs(config: AppConfig) {
    this.configProvider.next(config);
  }

  get config$(): Observable<AppConfig> {
    return this.configProvider.asObservable();
  }

  getConfigs() {
    this._httpClient.get<AppConfig>('api/configs/').pipe(
      tap((_config: AppConfig) => {
        if (Object.keys(_config).length > 0) {
          return this.configProvider.next(_config);
        } else {
          return this.getLocalConfigs();
        }
      })
    );
  }

  getLocalConfigs(): Observable<AppConfig> {
    // Subscribe to config changes
    return this._fuseConfigService.config$;
  }

  setLayout(layout: string): void {
    this.settingLayout(layout);
  }

  setScheme(scheme: Scheme): void {
    this.settingScheme(scheme);
  }

  setTheme(theme: Theme): void {
    this.settingTheme(theme);
  }
  
  settingLayout(layout: string): void {
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

  settingScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme } as AppConfig;
  }

  settingTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme } as AppConfig;
  }
}
