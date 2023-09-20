import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';
import { CreateUserComponent } from 'src/app/user/ui/create/create.component';
import { Destroy } from '@shared/utils/destroy';

@Component({
  selector: "user-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})

export class ClientUserComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'phone',
    'email',
    'activate',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() { }

  ngOnInit(): void {
    this._userService.getAll(history.state["id"])
      .pipe(takeUntil(this._destroy))
      .subscribe((users) => {
        // console.log(users);
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.resultsLength = users.length
      });
  }
  add() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
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
        switchMap((user) => this._userService.create(user)),
        takeUntil(this._destroy)
      )
      .subscribe(users => {
        if (users) {
          this.dataSource = new MatTableDataSource(users)
          this.resultsLength = users.length
        }
      });
  }
  edit(user: User) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: user,
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
        switchMap((updatedUser) => this._userService.update(updatedUser.id, updatedUser)),
        takeUntil(this._destroy)
      )
      .subscribe(users => {
        if (users) {
          this.dataSource = new MatTableDataSource(users)
          this.resultsLength = users.length
        }
      });
  }

  delete(id: string) {
    this._userService.delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe(users => {
        if (users) {
          this.dataSource = new MatTableDataSource(users)
          this.resultsLength = users.length
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}