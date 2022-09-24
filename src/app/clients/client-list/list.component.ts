import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subscription } from 'rxjs';

import { Clients } from 'src/app/clients/shared';

@Component({
  selector: 'app-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input() client$!: Observable<Clients[]>;
  @Output() clientsEmitter = new EventEmitter<Clients>();
  @Output() toggler = new EventEmitter<Clients>();
  // dataSource!: MatTableDataSource<Clients[]>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'select','name', 'phone', 'mobile', 'email', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  selection = new SelectionModel<Clients>(true, []);
  newStatus!: boolean

  constructor() {}
 
  ngOnInit(): void {
    this.subscription = this.client$.subscribe(
      (list) => {
        let array = list.map(
          item => {
            return {
              ...item
            }
          });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  isSelected() {
    return this.selection.selected;
  }

  selectClient(client: Clients) {
    this.clientsEmitter.emit(client);
  }

  toggleStatus(client: Clients) {
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
