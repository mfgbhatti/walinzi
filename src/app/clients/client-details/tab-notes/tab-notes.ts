import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { filter, Subject, Subscription, takeUntil, tap } from "rxjs";

import { ClientDetailsService, ClientNotes, ClientsService } from "src/app/clients/shared";
import { ClientTabNotesFormComponent } from "src/app/clients/client-details/shared";

@Component({
  selector: 'app-client-note',
  templateUrl: './tab-notes.html',
  styleUrls: ['./tab-notes.scss']
})

export class ClientTabNoteComponent implements OnInit {
  destroyed$ = new Subject<void>();
  notesPath: string = 'ClientNotes';
  notes: ClientNotes[] = [];
  subscription!: Subscription;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: ClientDetailsService
  ) { }

  addNotes() {
    const dialogRef = this.dialog.open(ClientTabNotesFormComponent, {
      data: { clientId: this.clientId$ },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.add(this.notesPath, data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }


  get() {
    this.subscription = this.db.get(this.notesPath, this.clientId$).subscribe((data) => this.notes.push(...data));
  }

  ngOnInit(): void {
    this.get();
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
    this.subscription.unsubscribe();
  }
}