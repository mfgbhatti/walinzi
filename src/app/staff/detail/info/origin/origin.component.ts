import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';

import { OriginService, StaffOrigin } from 'src/app/staff/shared';
import { Destroy } from 'src/app/_shared';
import { OriginFormComponent } from '../../shared';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
  providers: [Destroy],
})
export class OriginComponent implements OnInit {
  staffOrigin$!: Observable<StaffOrigin[]>;
  @Input() staffId!: string;

  constructor(
    private readonly originService: OriginService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.staffOrigin$ = this.originService.getAll();
  }

  addDetail() {
    const dialogRef = this.dialog.open(OriginFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.originService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffOrigin) {
    const dialogRef = this.dialog.open(OriginFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.originService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
