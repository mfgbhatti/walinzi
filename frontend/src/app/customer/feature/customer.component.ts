import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Customer } from '@shared/interfaces/customer.types';
import { Destroy } from '@shared/utils/destroy';
import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';
import { CustomerService } from '../data-access/customer.services';
import { CreateCustomerComponent } from '../ui/create/create.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [Destroy],
})
export class CustomerComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
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
  private _customerService = inject(CustomerService);
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() {}

  ngOnInit(): void {
    this._customerService
      .customers$
      .pipe(takeUntil(this._destroy))
      .subscribe((customers) => {
        // console.log(customers);
        this.dataSource = new MatTableDataSource(customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = customers.length;
      });
    this._userService.user$
      .pipe(takeUntil(this._destroy))
      .subscribe((user) => (this._user = user));
  }
  add() {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
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
        switchMap((customer) => this._customerService.create(customer)),
        takeUntil(this._destroy)
      )
      .subscribe((customers) => {
        if (customers) {
          this.dataSource = new MatTableDataSource(customers);
          this.resultsLength = customers.length;
        }
      });
  }
  edit(customer: Customer) {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      data: customer,
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
        switchMap((updatedCustomer) =>
          this._customerService.update(updatedCustomer.id, updatedCustomer)
        ),
        takeUntil(this._destroy)
      )
      .subscribe((customers) => {
        if (customers) {
          this.dataSource = new MatTableDataSource(customers);
          this.resultsLength = customers.length;
        }
      });
  }

  delete(id: string) {
    this._customerService
      .delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe((customers) => {
        if (customers) {
          this.dataSource = new MatTableDataSource(customers);
          this.resultsLength = customers.length;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
