import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';

import { TabNotesFormComponent } from 'src/app/control/sites';
import { Destroy, Notes, NoteService } from 'src/app/_shared';

@Component({
  selector: 'app-site-tab-notes',
  templateUrl: './site-tab-notes.component.html',
  styleUrls: ['./site-tab-notes.component.scss'],
  providers: [Destroy],
})
export class SiteTabNotesComponent implements OnInit {
  note$!: Observable<Notes[]>;
  @Input() siteId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly noteservice: NoteService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.note$ = this.noteservice.get(this.siteId$);
  }

  addNotes() {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { relative_id: this.siteId$ },
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
}
