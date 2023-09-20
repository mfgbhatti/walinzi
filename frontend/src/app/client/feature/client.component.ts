import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap, filter, takeUntil, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from '../data-access/client.service';
import { Client } from '@shared/interfaces/client.types';
import { CreateClientComponent } from '../ui/create/create.component';
import { Destroy } from '@shared/utils/destroy';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [Destroy],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'address',
    'post_code',
    'city',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  private _clientService = inject(ClientService);
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
        this.resultsLength = this.clients.length
      });
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
          this.resultsLength = this.clients.length
        }
      });
  }

}
