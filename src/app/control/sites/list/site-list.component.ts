import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Timestamp } from '@angular/fire/firestore';

import { Site } from '../shared';
import { Client } from 'src/app/control/clients/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
  providers: [Destroy],
})
export class SiteListComponent implements OnInit {
  @Input() site$!: Observable<Site[]>;
  @Input() client$!: Observable<Client[]>;
  @Output() siteEmitter = new EventEmitter<Site>();
  @Output() statustoggler = new EventEmitter<Site>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  newStatus!: boolean;
  selectedIndex!: number;
  clients: Client[] = [];
  displayedColumns: string[] = [
    'select',
    'name',
    'sin',
    'client',
    'location',
    'started',
    'status',
  ];
  selection = new SelectionModel<Site>(true, []);

  constructor(private readonly destroy: Destroy) {}

  ngOnInit(): void {
    this.client$
      .pipe(
        map((data) => this.clients.push(...data)),
        takeUntil(this.destroy)
      )
      .subscribe();
    this.site$
      .pipe(
        map((data) => {
          let sites = data.map((item: Site) => {
            return { ...item };
          });
          let new_sites: { [key: string]: string | boolean | Timestamp }[] = [];
          sites.forEach((data) => {
            let result = this.clients.filter((c) => c.id == data.relative_id);
            if (result.length > 0) {
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
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
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
    data.status = this.newStatus;
    this.statustoggler.emit(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
