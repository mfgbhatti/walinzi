import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { filter, takeUntil, tap } from 'rxjs/operators';

import {
  TabContactPersonFormComponent,
  TabExtraDetailFormComponent,
} from 'src/app/sites/shared';
import {
  ContactPerson,
  ContactPersonService,
  Destroy,
  ExtraDetail,
  ExtraDetailService,
} from 'src/app/_shared';

@Component({
  selector: 'app-site-tab-extra',
  templateUrl: './site-tab-extra.component.html',
  styleUrls: ['./site-tab-extra.component.scss'],
})
export class SiteTabExtraComponent implements OnInit {
  contact$!: Observable<ContactPerson[]>;
  detail$!: Observable<ExtraDetail[]>;
  @Input() siteId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy,
    private readonly cps: ContactPersonService,
    private readonly eds: ExtraDetailService
  ) {}

  ngOnInit(): void {
    this.contact$ = this.cps.get(this.siteId$);
    this.detail$ = this.eds.get(this.siteId$);
  }

  addDetail() {
    const dialogRef = this.dialog.open(TabExtraDetailFormComponent, {
      data: { relative_id: this.siteId$ },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.eds.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  addContact() {
    const dialogRef = this.dialog.open(TabContactPersonFormComponent, {
      data: { relative_id: this.siteId$ },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.cps.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
  editContact(data: ContactPerson) {
    const dialogRef = this.dialog.open(TabContactPersonFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.cps.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  deleteContact(id: string) {
    this.cps.delete(id);
  }
}
