import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, Observable, Subject, takeUntil, tap } from "rxjs";

import { TabNotesFormComponent } from "src/app/clients/shared";
import { Notes, NoteService } from "src/app/_shared";

@Component({
  selector: 'app-client-note',
  templateUrl: './tab-notes.html',
  styleUrls: ['./tab-notes.scss']
})

export class TabNoteComponent implements OnInit {
  destroyed$ = new Subject<void>();
  notesPath: string = 'Notes';
  note$!: Observable<Notes[]>;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: NoteService
  ) { }

  ngOnInit(): void {
    this.note$ = this.db.get(this.clientId$);
  }

  addNotes() {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { relativeId: this.clientId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.add(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$
      .next();
  }
}