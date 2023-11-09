import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Location } from '@shared/interfaces/location.types';
import { Destroy } from '@shared/utils/destroy';
import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';
import { CreateLocationComponent } from '../ui/create/create.component';
import { LocationService } from '../data-access/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [Destroy],
})
export class LocationComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'customer_name',
    'charge_rate',
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
  private _locationService = inject(LocationService);
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() {}

  ngOnInit(): void {
    this._locationService
      .getAll()
      .pipe(takeUntil(this._destroy))
      .subscribe((locations) => {
        // console.log(locations);
        this.dataSource = new MatTableDataSource(locations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = locations.length;
      });
    this._userService.user$
      .pipe(takeUntil(this._destroy))
      .subscribe((user) => (this._user = user));
  }
  add() {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
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
        switchMap((location) => this._locationService.create(location)),
        takeUntil(this._destroy)
      )
      .subscribe((locations) => {
        if (locations) {
          this.dataSource = new MatTableDataSource(locations);
          this.resultsLength = locations.length;
        }
      });
  }
  edit(location: Location) {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
      data: location,
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
        switchMap((updatedLocation) =>
          this._locationService.update(updatedLocation.id, updatedLocation)
        ),
        takeUntil(this._destroy)
      )
      .subscribe((locations) => {
        if (locations) {
          this.dataSource = new MatTableDataSource(locations);
          this.resultsLength = locations.length;
        }
      });
  }

  delete(id: string) {
    this._locationService
      .delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe((locations) => {
        if (locations) {
          this.dataSource = new MatTableDataSource(locations);
          this.resultsLength = locations.length;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
