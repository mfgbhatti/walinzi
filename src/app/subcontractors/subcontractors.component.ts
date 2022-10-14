import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';

import { Subcontractor, SubcontractorService } from 'src/app/subcontractors/shared';
import { SubFormComponent } from 'src/app/subcontractors';

@Component({
  selector: 'app-subcontractors',
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.scss']
})
export class SubcontractorComponent implements OnInit {
  allSub$!: Observable<Subcontractor[]>;
  selectedSub?: Subcontractor;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;
  generatedSin: string = ''

  constructor(
    private readonly db: SubcontractorService,
    private readonly dialog: MatDialog
  ) {
    this.allSub$ = this.db.getAll();
  }

  ngOnInit(): void {
  }

  addSubcontractor() {
    const dialogRef = this.dialog.open(SubFormComponent, {
      data: { },
      width: '40%',
      disableClose: true
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.create(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateSubcontractor() {
    const dialogRef = this.dialog.open(SubFormComponent, {
      data: { ...this.selectedSub },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.update(data)),
        tap((data) => this.selectSubcontractor(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateStatus(data: Subcontractor) {
    this.db.update(data);
  }
  selectSubcontractor(data: Subcontractor) {
    this.isSelected = true;
    this.selectedSub = data
  }

  deleteClient() {
    this.db.delete(this.selectedSub!.id);
    this.selectedSub = undefined;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
