import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Site, SiteService } from 'src/app/sites/shared';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {
  sub!: Subscription
  site$: Site[] = [];
  siteId!: string;
  clientId!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly siteService: SiteService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe (
      (__param) => this.siteId = __param['id']
    );
    this.sub = this.siteService.get(this.siteId).subscribe (
      (list) => {
        this.site$.push({...list} as Site);
        this.getClientId();
      });
  }
  
  async getClientId() {
    await this.site$.forEach( item => this.clientId = item.clientId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
