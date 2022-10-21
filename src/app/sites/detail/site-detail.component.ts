import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Subscription } from 'rxjs/internal/Subscription';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';

import { Client, ClientService } from 'src/app/clients/shared';
import { Site, SiteService } from 'src/app/sites/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss'],
  providers: [Destroy],
})
export class SiteDetailComponent implements OnInit {
  subscription!: Subscription;
  site$!: Observable<Site[]>;
  client$!: Observable<Client[]>;
  siteId: string = '';
  clientId: string = '';
  constructor(
    private readonly route: ActivatedRoute,
    private readonly siteService: SiteService,
    private readonly clientService: ClientService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((param: Params) => (this.siteId = param['siteId'])),
        switchMap(
          (param: Params) =>
            (this.site$ = this.siteService.get(param['siteId']))
        ),
        takeUntil(this.destroy)
      )
      .subscribe();

    this.route.params
      .pipe(
        tap((param: Params) => (this.clientId = param['clientId'])),
        switchMap(
          (param: Params) =>
            (this.client$ = this.clientService.get(param['clientId']))
        ),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  //   this.subscription = this.route.params.subscribe (
  //     (__param) => this.siteId = __param['id']
  //   );
  //   this.subscription = this.siteService.get(this.siteId).subscribe (
  //     (list) => {
  //       this.site$.push({...list} as Site);
  //       this.getClientId();
  //     });
  // }

  // async getClientId() {
  //   await this.site$.forEach( item => this.clientId = item.relative_id);
}
