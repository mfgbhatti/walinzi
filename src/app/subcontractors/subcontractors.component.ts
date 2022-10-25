import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';

import {
  Subcontractor,
  SubcontractorService,
} from 'src/app/subcontractors/shared';
import { SubFormComponent } from 'src/app/subcontractors';
import { Destroy } from '../_shared';

@Component({
  selector: 'app-subcontractors',
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.scss'],
  providers: [Destroy],
})
export class SubcontractorComponent implements OnInit {
  allSub$!: Observable<Subcontractor[]>;
  selectedSub?: Subcontractor;
  isSelected: boolean = false;
  generatedSin: string = '';

  constructor(
    private readonly db: SubcontractorService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.allSub$ = this.db.getAll();
  }

  addSubcontractor() {
    const dialogRef = this.dialog.open(SubFormComponent, {
      data: {},
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  updateSubcontractor() {
    const dialogRef = this.dialog.open(SubFormComponent, {
      data: { ...this.selectedSub },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.db.update(data)),
        tap((data) => this.selectSubcontractor(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  updateStatus(data: Subcontractor) {
    this.db.update(data);
  }
  selectSubcontractor(data: Subcontractor) {
    this.isSelected = true;
    this.selectedSub = data;
  }

  deleteClient() {
    this.db.delete(this.selectedSub!.id);
    this.selectedSub = undefined;
  }
}
