import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap, filter } from 'rxjs';

import {
  SiteService,
  Site
} from './shared';
import { SiteFormComponent } from 'src/app/sites';
import { Client, ClientService } from 'src/app/clients/shared'

type NewSite = Site & {
  clientName: string;
}
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  site$!: Observable<Site[]>;
  client$!: Observable<Client[]>;
  selectedSite!: Site | undefined;

  destroyed$ = new Subject<void>();
  isSelected: boolean = false;
  generatedSin: string = ''

  constructor(
    private readonly siteservice: SiteService,
    private readonly clientService: ClientService,
    private readonly dialog: MatDialog
  ) {
    this.site$ = this.siteservice.getAll();
    this.client$ = this.clientService.getAll();
  }

  ngOnInit(): void {
  }

  add() {
    this.generatedSin = '';
    this.generateSin();
    const dialogRef = this.dialog.open(SiteFormComponent, {
      data: { sin: this.generatedSin },
      width: '40%',
      disableClose: true
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.siteservice.create(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  update() {
    const dialogRef = this.dialog.open(SiteFormComponent, {
      data: { ...this.selectedSite },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.siteservice.update(data)),
        tap((data) => this.selectSite(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateStatus(data: Site) {
    this.siteservice.update(data);
  }

  selectSite(data: Site) {
    this.isSelected = true;
    this.selectedSite = data
  }

  generateSin() {
    const char = 'W7';
    const num = '0123456789';
    const length = 7;
    this.generatedSin += char
    for (let i = 1; i < length; i++) {
      this.generatedSin += num.charAt((Math.random()) * length);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
