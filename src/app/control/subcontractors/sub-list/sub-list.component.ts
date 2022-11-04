import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { Subcontractor } from 'src/app/control/subcontractors/shared';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss']
})
export class SubListComponent implements OnInit, OnDestroy {
  @Input() input$!: Observable<Subcontractor[]>;
  @Output() compEmitter = new EventEmitter<Subcontractor>();
  @Output() toggler = new EventEmitter<Subcontractor>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tabData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'name', 'sin', 'client', 'location', 'started', 'status'];
  subscription!: Subscription;
  selection = new SelectionModel<Subcontractor>(true, []);
  newStatus!: boolean;
  selectedIndex!: number;

  constructor(
  ) { }

  ngOnInit(): void {
    // this.sub = this.client$.subscribe( (data) => this.clients.push(...data));
    this.subscription = this.input$.subscribe((list) => {
      let array = list.map( (item: Subcontractor) => {return { ...item }});
      this.tabData = new MatTableDataSource(array);
      this.tabData.sort = this.sort;
      this.tabData.paginator = this.paginator;
    });// end od sub
  }

  isSelected() {
    return this.selection.selected;
  }

  selectRow(data: Subcontractor) {
    this.compEmitter.emit(data);
  }
  toggleStatus(data: Subcontractor) {
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
    this.tabData.filter = filterValue.trim().toLowerCase();

    if (this.tabData.paginator) {
      this.tabData.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
