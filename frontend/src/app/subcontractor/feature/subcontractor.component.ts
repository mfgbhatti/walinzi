import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Subcontractor } from '@shared/interfaces/subcontractor.types';
import { Destroy } from '@shared/utils/destroy';
import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';
import { SubcontractorService } from '../data-access/subcontractor.services';
import { CreateSubcontractorComponent } from '../ui/create/create.component';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
  styleUrls: ['./subcontractor.component.scss'],
  providers: [Destroy],
})
export class SubcontractorComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'pay_rate',
    'land_line',
    'mobile',
    'email',
    'address',
    'post_code',
    'city',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _user!: User | null;

  resultsLength = 0;
  private _subcontractorService = inject(SubcontractorService);
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() {}

  ngOnInit(): void {
    this._subcontractorService
      .subcontractors$
      .pipe(takeUntil(this._destroy))
      .subscribe((subcontractors) => {
        // console.log(subcontractors);
        this.dataSource = new MatTableDataSource(subcontractors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = subcontractors.length;
      });
    this._userService.user$
      .pipe(takeUntil(this._destroy))
      .subscribe((user) => (this._user = user));
  }
  add() {
    const dialogRef = this.dialog.open(CreateSubcontractorComponent, {
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
        switchMap((subcontractor) => this._subcontractorService.create(subcontractor)),
        takeUntil(this._destroy)
      )
      .subscribe((subcontractors) => {
        if (subcontractors) {
          this.dataSource = new MatTableDataSource(subcontractors);
          this.resultsLength = subcontractors.length;
        }
      });
  }
  edit(subcontractor: Subcontractor) {
    const dialogRef = this.dialog.open(CreateSubcontractorComponent, {
      data: subcontractor,
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
        switchMap((updatedSubcontractor) =>
          this._subcontractorService.update(updatedSubcontractor.id, updatedSubcontractor)
        ),
        takeUntil(this._destroy)
      )
      .subscribe((subcontractors) => {
        if (subcontractors) {
          this.dataSource = new MatTableDataSource(subcontractors);
          this.resultsLength = subcontractors.length;
        }
      });
  }

  delete(id: string) {
    this._subcontractorService
      .delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe((subcontractors) => {
        if (subcontractors) {
          this.dataSource = new MatTableDataSource(subcontractors);
          this.resultsLength = subcontractors.length;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
