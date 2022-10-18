import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

import { SiteService, Site } from "src/app/sites/shared";

@Component({
  selector: 'app-client-details-sites',
  templateUrl: './tab-sites.html',
  styleUrls: ['./tab-sites.scss']
})

export class TabSitesComponent implements OnInit {
  site$!: Observable<Site[]>;
  @Input() clientId$!: string;
  displayedColumns: string[] = ['serial', 'name'];

  constructor (
    private readonly siteService: SiteService
  ) { }

  ngOnInit(): void {
    // change this to get subscription of data to save time on large data
    this.site$ = this.siteService.search(this.clientId$);
  }


}