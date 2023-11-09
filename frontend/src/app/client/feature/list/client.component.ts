import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from 'src/app/client/data-access/client.service';
import { Client } from '@shared/interfaces/client.types';
import { CreateClientComponent } from 'src/app/client/ui/create/create.component';
import { Destroy } from '@shared/utils/destroy';
import { UserService } from 'src/app/user/data-access/user.service';
import { User } from '@shared/interfaces/user.types';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [Destroy],
})
export class ClientComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'land_line',
    'mobile',
    'email',
    'address',
    'post_code',
    'city',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _user!: User | null

  resultsLength = 0;
  private _clientService = inject(ClientService);
  private _userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);

  constructor() { }

  ngOnInit(): void {
    this._clientService.getAll()
      .pipe(takeUntil(this._destroy))
      .subscribe((clients) => {
        // console.log(clients);
        this.dataSource = new MatTableDataSource(clients)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.resultsLength = clients.length
      });
    this._userService.user$.pipe(takeUntil(this._destroy)).subscribe(user => this._user = user)
}
  add() {
    const dialogRef = this.dialog.open(CreateClientComponent, {
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
        switchMap((client) => this._clientService.create(client)),
        takeUntil(this._destroy)
      )
      .subscribe(clients => {
        if (clients) {
          this.dataSource = new MatTableDataSource(clients)
          this.resultsLength = clients.length
        }
      });
  }
  edit(client: Client) {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      data: client,
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
        switchMap((updatedClient) => this._clientService.update(updatedClient.id, updatedClient)),
        takeUntil(this._destroy)
      )
      .subscribe(clients => {
        if (clients) {
          this.dataSource = new MatTableDataSource(clients)
          this.resultsLength = clients.length
        }
      });
  }

  delete(id: string) {
    this._clientService.delete(id)
      .pipe(takeUntil(this._destroy))
      .subscribe(clients => {
        if (clients) {
          this.dataSource = new MatTableDataSource(clients)
          this.resultsLength = clients.length
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
