import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil, tap } from "rxjs/operators";

import {
  ContactFormComponent,
  TabDetailFormComponent
} from "src/app/clients/shared";
import { ContactPerson, ContactPersonService, Destroy, ExtraDetail, ExtraDetailService } from "src/app/_shared";

type detail = {
  vat: string;
  website: string;
  submitted: boolean;
}
@Component({
  selector: 'app-client-detail',
  templateUrl: './tab-details.html',
  styleUrls: ['./tab-details.scss'],
  providers: [Destroy]
})

export class TabDetailComponent implements OnInit {
  destroyed$ = new Subject<void>();
  contactPersonPath: string = 'ContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';
  detail$!: Observable<detail[]>;
  contact$!: Observable<ContactPerson[]>;
  selected!: ExtraDetail;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly detailService: ExtraDetailService,
    private readonly cps: ContactPersonService,
    private readonly destroy: Destroy
  ) { }

  ngOnInit(): void {
    this.detail$ = this.detailService.get(this.clientId$);
    this.contact$ = this.cps.get(this.clientId$);
  }

  select(data: ExtraDetail) {
    this.selected = data;
  }

  addDetail() {
    const dialogRef = this.dialog.open(TabDetailFormComponent, {
      data: { relative_id: this.clientId$ },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.detailService.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetails(data: detail) {
    const dialogRef = this.dialog.open(TabDetailFormComponent, {
      data: {...data},
      width: '40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.detailService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { relative_id: this.clientId$ },
      width: '40%',
      disableClose: true
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

  delete(id: string) {
    this.cps.delete(id);
  }
}