import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { Destroy, Licence, SiaDetailService } from 'src/app/_shared';
import { LicenceFormComponent } from '../../shared';

@Component({
  selector: 'app-sia-detail',
  templateUrl: './sia-detail.component.html',
  styleUrls: ['./sia-detail.component.scss'],
  providers: [Destroy],
})
export class SiaDetailComponent implements OnInit {
  licence$!: Observable<Licence[]>;
  @Input() staffId!: string;

  constructor(
    private readonly licenceService: SiaDetailService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.licence$ = this.licenceService.getLicenceByStaffId(this.staffId);
  }

  addLicence() {
    const dialogRef = this.dialog.open(LicenceFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.licenceService.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editLicence(data: Licence) {
    const dialogRef = this.dialog.open(LicenceFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.licenceService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  deleteLicence(id: string) {
    this.licenceService.delete(id);
  }
}
