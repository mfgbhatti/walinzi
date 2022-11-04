import { Component, Input, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { Site, SiteService } from 'src/app/control/sites/shared';

import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-client-details-sites',
  templateUrl: './tab-sites.html',
  styleUrls: ['./tab-sites.scss'],
  providers: [Destroy],
})
export class TabSitesComponent implements OnInit {
  @Input() clientId$!: string;
  activeSites: Site[] = [];
  inactiveSites: Site[] = [];

  constructor(
    private readonly siteService: SiteService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    // change this to get subscription of data to save time on large data
    this.siteService
      .searchByClientId(this.clientId$)
      .pipe(
        map((data) => {
          data.filter((x, index) => {
            if (x.status == true) {
              this.activeSites.push(data[index]);
            } else {
              this.inactiveSites.push(data[index]);
            }
          });
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
