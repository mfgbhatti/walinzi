import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Guard } from '@shared/interfaces/guard.types';
import { Destroy } from '@shared/utils/destroy';
import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';
import { GuardService } from '../data-access/guard.services';
import { CreateGuardComponent } from '../ui/create/create.component';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.scss'],
  providers: [Destroy],
})
export class GuardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['first_name', 'last_name', 'display_name', 'pay_rate', 'subcontractor_name', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _user!: User | null;

  resultsLength = 0;
  private _guardService = inject(GuardService);
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() {}

  ngOnInit(): void {
    this._guardService
      .guards$
      .pipe(takeUntil(this._destroy))
      .subscribe((guards) => {
        // console.log(guards);
        this.dataSource = new MatTableDataSource(guards);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = guards.length;
      });
    this._userService.user$
      .pipe(takeUntil(this._destroy))
      .subscribe((user) => (this._user = user));
  }
  add() {
    const dialogRef = this.dialog.open(CreateGuardComponent, {
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
        switchMap((guard) => this._guardService.create(guard)),
        takeUntil(this._destroy)
      )
      .subscribe((guards) => {
        if (guards) {
          this.dataSource = new MatTableDataSource(guards);
          this.resultsLength = guards.length;
        }
      });
  }
  edit(guard: Guard) {
    const dialogRef = this.dialog.open(CreateGuardComponent, {
      data: guard,
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
        switchMap((updatedGuard) =>
          this._guardService.update(updatedGuard.id, updatedGuard)
        ),
        takeUntil(this._destroy)
      )
      .subscribe((guards) => {
        if (guards) {
          this.dataSource = new MatTableDataSource(guards);
          this.resultsLength = guards.length;
        }
      });
  }

  delete(id: string) {
    this._guardService
      .delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe((guards) => {
        if (guards) {
          this.dataSource = new MatTableDataSource(guards);
          this.resultsLength = guards.length;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
