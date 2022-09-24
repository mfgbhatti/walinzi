import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, Subject, Subscription, takeUntil, tap } from "rxjs";
import { ClientContactPerson, ClientDetails, ClientDetailsService } from "src/app/clients/shared";
import { ClientTabContactFormComponent, ClientTabDetailFormComponent } from "../shared";

@Component({
  selector: 'app-client-detail',
  templateUrl: './tab-details.html',
  styleUrls: ['./tab-details.scss']
})

export class ClientTabDetailComponent implements OnInit {
  destroyed$ = new Subject<void>();
  notesPath: string = 'ClientNotes';
  contactPersonPath: string = 'ClientContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';
  detail: ClientDetails[] = [];
  contact: ClientContactPerson[]= [];
  subscription!: Subscription;
  selectedDetail!: ClientDetails;
  added: boolean = false
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: ClientDetailsService
  ) { 
    // this.get();
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

  addContact() {
    const dialogRef = this.dialog.open(ClientTabContactFormComponent, {
      data: { clientId: this.clientId$ },
      width: '40%',
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

  checkIfAdded() {
    this.detail.forEach( (element) => {
      if(element.submitted) {
        this.added = true
      }
      return { 
        ...element
      }
    });
  }

  get() {
    this.subscription = this.db.get(this.extraDetailPath, this.clientId$).subscribe( (data) => this.detail.push(...data));
    this.subscription = this.db.get(this.contactPersonPath,this.clientId$).subscribe( (data) => this.contact.push(...data));
  }

  ngOnInit(): void {
    this.get();

    console.log(this.added)
  }

  editDetails() {
    const dialogRef = this.dialog.open(ClientTabDetailFormComponent, {
      data: { ...this.checkIfAdded },
      width: '40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.update(this.extraDetailPath, data)),
        // tap((data) => this.selectedDetails(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroyed$
      .next();
    this.subscription.unsubscribe();
  }
}