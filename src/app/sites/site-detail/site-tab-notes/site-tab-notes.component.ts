import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';

import { TabNotesFormComponent } from 'src/app/sites';
import { Notes, NoteService } from 'src/app/_shared';

@Component({
  selector: 'app-site-tab-notes',
  templateUrl: './site-tab-notes.component.html',
  styleUrls: ['./site-tab-notes.component.scss']
})
export class SiteTabNotesComponent implements OnInit {
  destroyed$ = new Subject<void>();
  note$!: Observable<Notes[]>;
  @Input() siteId$!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: NoteService
  ) { }

  ngOnInit(): void {
    this.note$ = this.db.get(this.siteId$);
  }

  addNotes() {
    const dialogRef = this.dialog.open(TabNotesFormComponent, {
      data: { relativeId: this.siteId$ },
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
