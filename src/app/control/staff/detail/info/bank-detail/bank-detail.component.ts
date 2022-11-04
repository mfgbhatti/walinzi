import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { BankDetailService, StaffBankDetail } from 'src/app/staff/shared';
import { Destroy } from 'src/app/_shared';
import { BankFormComponent } from '../../shared';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss'],
  providers: [Destroy],
})
export class BankDetailComponent implements OnInit {
  StaffBankDetail$!: Observable<StaffBankDetail[]>;
  @Input() staffId!: string;

  constructor(
    private readonly bankDetailService: BankDetailService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.StaffBankDetail$ = this.bankDetailService.searchByStaffId(
      this.staffId
    );
  }

  addDetail() {
    const dialogRef = this.dialog.open(BankFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.bankDetailService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffBankDetail) {
    const dialogRef = this.dialog.open(BankFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.bankDetailService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
