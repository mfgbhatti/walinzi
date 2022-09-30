import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, Observable, observable, Subject, Subscription, takeUntil, tap } from "rxjs";

import { 
  ClientDetails, 
  ClientDetailsService,
  ContactFormComponent, 
  ClientTabDetailFormComponent
 } from "src/app/clients/shared";
import { ContactPerson } from "src/app/_shared";

@Component({
  selector: 'app-client-detail',
  templateUrl: './tab-details.html',
  styleUrls: ['./tab-details.scss']
})

export class ClientTabDetailComponent implements OnInit {
  destroyed$ = new Subject<void>();
  contactPersonPath: string = 'ContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';
  detail$!: Observable<ClientDetails[]>;
  contact$!: Observable<ContactPerson[]>;
  subscription!: Subscription;
  selectedDetail!: ClientDetails;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: ClientDetailsService
  ) { }

  ngOnInit(): void {
    this.detail$ = this.db.getextradetail(this.clientId$);
    this.contact$ = this.db.get(this.contactPersonPath, this.clientId$);
  }

  selectDetails(detail: ClientDetails) {
    this.selectedDetail = detail;
  }
  addDetail() {
    const dialogRef = this.dialog.open(ClientTabDetailFormComponent, {
      data: { clientId: this.clientId$ },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.add(this.extraDetailPath, data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  editDetails() {
    const dialogRef = this.dialog.open(ClientTabDetailFormComponent, {
      data: { },
      width: '40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.update(this.extraDetailPath, data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: { relativeId: this.clientId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.add(this.contactPersonPath, data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  delete(id: string) {
    this.db.delete(this.contactPersonPath, id);
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
  }
}