import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { FormComponent } from 'src/app/staff';
import { Staff, StaffService } from 'src/app/staff/shared';
import { Destroy } from '../_shared';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [Destroy],
})
export class StaffComponent implements OnInit {
  generatedPin!: string;
  staff$!: Observable<Staff[]>;
  isSelected: boolean = false;
  selectedStaff!: Staff;

  constructor(
    private readonly dialog: MatDialog,
    private readonly staffService: StaffService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.staff$ = this.staffService.getAll();
  }

  add() {
    this.generatePin();
    const dialogRef = this.dialog.open(FormComponent, {
      data: { pin: this.generatedPin },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.staffService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  update() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { ...this.selectedStaff },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.staffService.update(data)),
        tap((data) => this.selectStaff(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  updateStatus(data: Staff) {
    this.staffService.update(data);
  }

  selectStaff(data: Staff) {
    this.isSelected = true;
    this.selectedStaff = data;
  }

  generatePin() {
    this.generatedPin = '';
    const num = '0123456789';
    const length = 5;
    this.generatedPin += '5';
    for (let i = 1; i < length; i++) {
      this.generatedPin += num.charAt(Math.random() * length);
    }
  }
}
