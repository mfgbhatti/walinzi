import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { StaffVetting, VettingService } from 'src/app/control/staff/shared';
import { Destroy } from 'src/app/_shared';
import { VettingFormComponent } from '../../shared';

@Component({
  selector: 'app-info-vetting',
  templateUrl: './vetting.component.html',
  styleUrls: ['./vetting.component.scss'],
  providers: [Destroy],
})
export class VettingInfoComponent implements OnInit {
  vettingDetail$!: Observable<StaffVetting[]>;
  @Input() staffId!: string;

  constructor(
    private readonly vettingService: VettingService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.vettingDetail$ = this.vettingService.searchByStaffId(this.staffId);
  }

  addDetail() {
    const dialogRef = this.dialog.open(VettingFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.vettingService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffVetting) {
    const dialogRef = this.dialog.open(VettingFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.vettingService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
