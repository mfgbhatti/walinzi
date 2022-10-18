import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

import { Staff } from '../shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() staff$!: Observable<Staff[]>;
  @Output() staffEmitter = new EventEmitter<Staff>();
  @Output() toggler = new EventEmitter<Staff>();
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'name', 'pin', 'phone', 'mobile', 'email', 'added', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  selection = new SelectionModel<Staff>(true, []);
  newStatus!: boolean
  selectedIndex!: number;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.staff$.subscribe(
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

  select(data: Staff) {
    this.staffEmitter.emit(data);
  }

  toggleStatus(data: Staff) {
    if (!data.status) {
      this.newStatus = true;
    } else {
      this.newStatus = false;
    }
    data.status = this.newStatus
    this.toggler.emit(data)
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
