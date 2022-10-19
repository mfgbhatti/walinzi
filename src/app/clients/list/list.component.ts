import { Component, EventEmitter, Input, Output, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { map, takeUntil } from 'rxjs';

import { Client } from 'src/app/clients/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [Destroy]
})
export class ListComponent implements OnInit {
  @Input() client$!: Observable<Client[]>;
  @Output() clientEmitter = new EventEmitter<Client>();
  @Output() toggler = new EventEmitter<Client>();
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'name', 'phone', 'mobile', 'email', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Client>(true, []);
  newStatus!: boolean
  selectedIndex!: number;

  constructor(private readonly destroy: Destroy) { }

  ngOnInit(): void {
    this.client$.pipe(
      map(data => {
        let array = data.map(
          item => {
            return {
              ...item
            }
          });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      takeUntil(this.destroy)
    ).subscribe();
  }

  isSelected() {
    return this.selection.selected;
  }

  selectClient(client: Client) {
    this.clientEmitter.emit(client);
  }

  toggleStatus(client: Client) {
    if (!client.status) {
      this.newStatus = true;
    } else {
      this.newStatus = false;
    }
    client.status = this.newStatus
    this.toggler.emit(client)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
