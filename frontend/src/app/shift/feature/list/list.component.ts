import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, of, switchMap, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CreateShiftComponent } from '../../ui/create/create.component';
import { Destroy } from '@shared/utils/destroy';
import { ShiftService } from '../../data-access/shift.services';
import { Shift } from '@shared/interfaces/shift.types';

@Component({
  selector: 'shift-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [Destroy],
})
export class ShiftListComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'location_name',
    'staff_name',
    'time_in',
    'time_out',
    'date_in',
    'break_display',
    'duration',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  private _shiftService = inject(ShiftService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() {}

  ngOnInit(): void {
    this._shiftService.shifts$
      .pipe(takeUntil(this._destroy))
      .subscribe((shifts) => {
        // console.log(shifts);
        this.dataSource = new MatTableDataSource(shifts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = shifts!.length;
      });
  }
  add() {
    const dialogRef = this.dialog.open(CreateShiftComponent, {
      data: {},
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        catchError((err) => {
          console.log('There is an error:', err);
          return of(null);
        }),
        switchMap((shift) => this._shiftService.create(shift)),
        takeUntil(this._destroy)
      )
      .subscribe((shifts) => {
        if (shifts) {
          this.dataSource = new MatTableDataSource(shifts);
          this.resultsLength = shifts.length;
        }
      });
  }
  edit(shift: Shift) {
    const dialogRef = this.dialog.open(CreateShiftComponent, {
      data: shift,
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        catchError((err) => {
          console.log('There is an error:', err);
          return of(null);
        }),
        switchMap((updatedShift) =>
          this._shiftService.update(updatedShift.id, updatedShift)
        ),
        takeUntil(this._destroy)
      )
      .subscribe((shifts) => {
        if (shifts) {
          this.dataSource = new MatTableDataSource(shifts);
          this.resultsLength = shifts.length;
        }
      });
  }

  delete(id: string) {
    this._shiftService
      .delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe((shifts) => {
        if (shifts) {
          this.dataSource = new MatTableDataSource(shifts);
          this.resultsLength = shifts.length;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
