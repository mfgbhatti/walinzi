import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { PassportService, StaffPassport } from 'src/app/control/staff/shared';
import { Destroy } from 'src/app/_shared';
import { PassportFormComponent } from '../../shared';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss'],
  providers: [Destroy],
})
export class PassportComponent implements OnInit {
  passport$!: Observable<StaffPassport[]>;
  @Input() staffId!: string;

  constructor(
    private readonly passportService: PassportService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.passport$ = this.passportService.searchByStaffId(this.staffId);
  }

  addDetail() {
    const dialogRef = this.dialog.open(PassportFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.passportService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffPassport) {
    const dialogRef = this.dialog.open(PassportFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.passportService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
