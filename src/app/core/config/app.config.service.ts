import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { AppConfig } from '@fuse/services/config/config.types';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  private _config: ReplaySubject<AppConfig> = new ReplaySubject<AppConfig>(1);

  constructor (private _httpClient: HttpClient) {}

  get config$(): Observable<AppConfig> {
    return this._config.asObservable();
  }

  get(): Observable<AppConfig> {
    return this._httpClient.get<AppConfig>('api/app-config/').pipe(
      tap((config) => {
        this._config.next(config);
      })
    );
  }

}
