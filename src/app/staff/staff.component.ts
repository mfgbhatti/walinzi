import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { FormComponent } from 'src/app/staff';
import { Staff, StaffService } from 'src/app/staff/shared';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  generatedPin!: string;
  staff$!: Observable<Staff[]>;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly staffservice: StaffService
  ) { }

  ngOnInit(): void {
    this.staff$ = this.staffservice.getAll();
  }

  add() {
    this.generatePin();
    const dialogRef = this.dialog.open(FormComponent, {
      data: { pin: this.generatedPin },
      width: '40%',
      disableClose: true
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.staffservice.create(data)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  update() {}

  generatePin() {
    this.generatedPin = ''
    const num = '0123456789';
    const length = 5;
    this.generatedPin += '5'
    for (let i = 1; i < length; i++) {
      this.generatedPin += num.charAt((Math.random()) * length);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
