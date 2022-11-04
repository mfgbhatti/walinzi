import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';

import { ChargedRate, PayRate, RatesService, TabChargedRatesFormComponent, TabPayRatesFormComponent } from 'src/app/control/sites/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-site-tab-rate',
  templateUrl: './site-tab-rate.component.html',
  styleUrls: ['./site-tab-rate.component.scss'],
  providers: [Destroy]
})
export class SiteTabRateComponent implements OnInit {
  charged$!:Observable<ChargedRate[]>;
  pay$!:Observable<PayRate[]>;
  payPath: string = 'PayRates';
  chargedPath: string = 'ChargedRates';
  @Input() siteId$!: string;

  constructor(
    private readonly rateService: RatesService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
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
        takeUntil(this.destroy)
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
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
