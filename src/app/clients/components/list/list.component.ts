import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Clients } from 'src/app/_modals';

@Component({
  selector: 'app-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input() client$!: Observable<Clients[]>;
  @Output() clientsEmitter = new EventEmitter<Clients>();
  dataSource!: MatTableDataSource<Clients[]>;
  displayedColumns: string[] = [ 'name', 'phone', 'mobile', 'email', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // const clients = Array.from(
    //   {length: 100}, 
    //   (_, k) => createNewClient(k + 1));
    // this.dataSource = new MatTableDataSource(clients);
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.clients)
  }

  selectClient(client: Clients) {
    this.clientsEmitter.emit(client);
  }

}
