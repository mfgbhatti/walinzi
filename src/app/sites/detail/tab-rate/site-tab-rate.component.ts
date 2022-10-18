import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';

import { ChargedRate, PayRate, RatesService, TabChargedRatesFormComponent, TabPayRatesFormComponent } from 'src/app/sites/shared';

@Component({
  selector: 'app-site-tab-rate',
  templateUrl: './site-tab-rate.component.html',
  styleUrls: ['./site-tab-rate.component.scss']
})
export class SiteTabRateComponent implements OnInit {
  destroyed$ = new Subject<void>();
  charged$!:Observable<ChargedRate[]>;
  pay$!:Observable<PayRate[]>;
  payPath: string = 'PayRates';
  chargedPath: string = 'ChargedRates';
  @Input() siteId$!: string;

  constructor(
    private readonly rateService: RatesService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.charged$ = this.rateService.get(this.chargedPath, this.siteId$)
    this.pay$ = this.rateService.get(this.payPath, this.siteId$);
  }
  
  addChargedRate() {
    const dialogRef = this.dialog.open(TabChargedRatesFormComponent, {
      data: { relative_id: this.siteId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.rateService.add(this.chargedPath,data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  addPayRate() {
    const dialogRef = this.dialog.open(TabPayRatesFormComponent, {
      data: { relative_id: this.siteId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.rateService.add(this.payPath,data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
  }

}
