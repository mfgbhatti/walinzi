import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';

import { TabContactPersonFormComponent, TabExtraDetailFormComponent } from 'src/app/sites/shared';
import { ContactPerson, ContactPersonService, ExtraDetail, ExtraDetailService } from 'src/app/_shared';

@Component({
  selector: 'app-site-tab-extra',
  templateUrl: './site-tab-extra.component.html',
  styleUrls: ['./site-tab-extra.component.scss']
})
export class SiteTabExtraComponent implements OnInit {
  contact$!: Observable<ContactPerson[]>;
  detail$!: Observable<ExtraDetail[]>;
  destroyed$ = new Subject<void>();
  @Input() siteId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly cps: ContactPersonService,
    private readonly eds: ExtraDetailService
  ) { }

  ngOnInit(): void {
    this.contact$ = this.cps.get(this.siteId$);
    this.detail$ = this.eds.get(this.siteId$);
  }

  addDetail() {
    const dialogRef = this.dialog.open(TabExtraDetailFormComponent, {
      data: { relativeId: this.siteId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.eds.add(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
  
  addContact() {
    const dialogRef = this.dialog.open(TabContactPersonFormComponent, {
      data: { relativeId: this.siteId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.cps.add(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
  }

}
