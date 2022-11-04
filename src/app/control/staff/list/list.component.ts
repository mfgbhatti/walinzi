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

import { Destroy } from 'src/app/_shared';
import { Staff } from '../shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [Destroy],
})
export class ListComponent implements OnInit {
  @Input() staff$!: Observable<Staff[]>;
  @Output() staffEmitter = new EventEmitter<Staff>();
  @Output() toggler = new EventEmitter<Staff>();
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'name',
    'pin',
    'phone',
    'mobile',
    'email',
    'added',
    'status',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Staff>(true, []);
  newStatus!: boolean;
  selectedIndex!: number;

  constructor(private readonly destroy: Destroy) {}

  ngOnInit(): void {
    this.staff$
      .pipe(
        map((data) => {
          let array = data.map((item) => {
            return {
              ...item,
            };
          });
          this.dataSource = new MatTableDataSource(array);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
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
    data.status = this.newStatus;
    this.toggler.emit(data);
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
