import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subject, takeUntil, tap } from 'rxjs';

import { FormComponent } from 'src/app/staff';
import { StaffService } from 'src/app/staff/shared';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  generatedPin!: string;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly db: StaffService
  ) { }

  ngOnInit(): void {
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
        tap((data) => this.db.create(data)),
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

}
