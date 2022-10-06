import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-tab-info',
  templateUrl: './site-tab-info.component.html',
  styleUrls: ['./site-tab-info.component.scss']
})
export class SiteTabInfoComponent implements OnInit {
  @Input() clientId$!: string;
  @Input() siteId$!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
