import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil, tap, filter } from 'rxjs/operators';

import { TabNotesFormComponent } from 'src/app/control/clients/shared';
import { Destroy, Notes, NoteService } from 'src/app/_shared';

@Component({
  selector: 'app-client-note',
  templateUrl: './tab-notes.html',
  styleUrls: ['./tab-notes.scss'],
  providers: [Destroy],
})
export class TabNoteComponent implements OnInit {
  notesPath: string = 'Notes';
  note$!: Observable<Notes[]>;
  @Input() clientId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly noteservice: NoteService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.note$ = this.noteservice.get(this.clientId$);
  }

  add() {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { relative_id: this.clientId$ },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.noteservice.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
  edit(data: Notes) {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.noteservice.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  delete(id: string) {
    this.noteservice.delete(id);
  }
}
