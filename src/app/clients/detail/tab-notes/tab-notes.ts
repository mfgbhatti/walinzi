import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil, tap, filter } from 'rxjs/operators';

import { TabNotesFormComponent } from "src/app/clients/shared";
import { Destroy, Notes, NoteService } from "src/app/_shared";

@Component({
  selector: 'app-client-note',
  templateUrl: './tab-notes.html',
  styleUrls: ['./tab-notes.scss'],
  providers: [Destroy]
})

export class TabNoteComponent implements OnInit {
  notesPath: string = 'Notes';
  note$!: Observable<Notes[]>;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: NoteService,
    private readonly destroy: Destroy
  ) { }

  ngOnInit(): void {
    this.note$ = this.db.get(this.clientId$);
  }

  addNotes() {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { relative_id: this.clientId$ },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

}