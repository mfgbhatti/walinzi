import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { Clients } from 'src/app/clients/shared';
import { Site } from '../shared';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  @Input() site$!: Observable<Site[]>;
  @Input() client$!: Observable<Clients[]>;
  @Output() siteEmitter = new EventEmitter<Site>();
  @Output() toggler = new EventEmitter<Site>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  siteData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select', 'name', 'sin', 'client', 'location', 'started', 'status'];
  sub!: Subscription;
  selection = new SelectionModel<Site>(true, []);
  newStatus!: boolean;
  name: string = '';

  constructor() { }

  ngOnInit(): void {
    this.sub = this.site$.subscribe((list) => {
      let array = list.map(
        (item: Site) => {
          return { ...item }
        });
      // change clientId to client name
      // array.map((x) => {
      //   let result = this.client$.filter(a1 => a1.id == x.clientId);
      //   if (result.length > 0) { x.clientId = String(result[0].name); }
      //   return x
      // })
      this.siteData = new MatTableDataSource(array);
      this.siteData.sort = this.sort;
      this.siteData.paginator = this.paginator;
    });
  }

  isSelected() {
    return this.selection.selected;
  }

  selectSite(site: Site) {
    this.siteEmitter.emit(site);
  }
  toggleStatus(site: Site) {
    if (!site.status) {
      this.newStatus = true;
    } else {
      this.newStatus = false;
    }
    site.status = this.newStatus
    this.toggler.emit(site)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.siteData.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);

    if (this.siteData.paginator) {
      this.siteData.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
