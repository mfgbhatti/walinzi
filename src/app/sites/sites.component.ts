import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil, tap, filter } from 'rxjs';

import {
  SiteService,
  Site
} from './shared';
import { SiteFormComponent } from 'src/app/sites';

type NewSite = Site & {
  clientName: string;
}
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  allSite$!: Observable<Site[]>;
  selectedSite?: Site;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;
  generatedSin: string = ''

  constructor(
    private readonly db: SiteService,
    private readonly dialog: MatDialog
  ) {
    this.allSite$ = this.db.getAll();
  }

  ngOnInit(): void {
  }

  addSite() {
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
        tap((data) => this.db.create(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateSite() {
    const dialogRef = this.dialog.open(SiteFormComponent, {
      data: { ...this.selectedSite },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.update(data)),
        tap((data) => this.selectSite(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateStatus(data: Site) {
    this.db.update(data);
  }
  selectSite(data: Site) {
    this.isSelected = true;
    this.selectedSite = data
  }

  deleteClient() {
    this.db.delete(this.selectedSite!.id);
    this.selectedSite = undefined;
  }

  generateSin() {
    const char = 'W';
    const num = '0123456789';
    const length = 7;
    this.generatedSin += char
    for (let i = 0; i < length; i++) {
      this.generatedSin += num.charAt((Math.random()) * length);
    }
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
  }

}
