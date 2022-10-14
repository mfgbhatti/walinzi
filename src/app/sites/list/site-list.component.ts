import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject'

import { Site } from '../shared';
import { Client } from 'src/app/clients/shared';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  @Input() site$!: Observable<Site[]>;
  @Input() client$!: Observable<Client[]>;
  @Output() siteEmitter = new EventEmitter<Site>();
  @Output() statustoggler = new EventEmitter<Site>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sub!: Subscription;
  dataSource!: MatTableDataSource<any>;
  newStatus!: boolean;
  selectedIndex!: number;
  clients: Client[] = [];
  destroyed$ = new Subject<void>();
  displayedColumns: string[] = ['select', 'name', 'sin', 'client', 'location', 'started', 'status'];
  selection = new SelectionModel<Site>(true, []);

  constructor(
  ) { }

  ngOnInit(): void {
    this.sub = this.client$.subscribe( (data) => this.clients.push(...data));
    this.sub = this.site$.subscribe((list) => {
      let sites = list.map((item: Site) => { return { ...item } });
      let new_sites: {[key:string]:string | boolean | Timestamp}[] = [];
      sites.forEach( (data) => {
        let result = this.clients.filter(a1 => a1.id == data.relative_id);
        if(result.length > 0) {
          new_sites.push({
            id: data.id,
            relative_id: data.relative_id,
            clientName: result[0].name,
            name: data.name,
            sin: data.sin,
            post_code: data.post_code,
            address: data.address,
            city: data.city,
            status: data.status,
            started: data.started,
            finished: data.finished,
          });
        }
      });
      this.dataSource = new MatTableDataSource(new_sites);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });// end od sub
  }

  selectSite(data: Site) {
    this.siteEmitter.emit({
      id: data.id,
      relative_id: data.relative_id,
      name: data.name,
      sin: data.sin,
      post_code: data.post_code,
      address: data.address,
      city: data.city,
      status: data.status,
      started: data.started,
      finished: data.finished,
    });
  }

  toggleStatus(data: Site) {
    if (!data.status) {
      this.newStatus = true;
    } else {
      this.newStatus = false;
    }
    data.status = this.newStatus
    this.statustoggler.emit(data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.sub.unsubscribe();
  }

}
