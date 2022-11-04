import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';

import { AddressService, StaffAddress } from 'src/app/control/staff/shared';
import { Destroy } from 'src/app/_shared';
import { AddressFormComponent } from '../../shared';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [Destroy],
})
export class AddressComponent implements OnInit {
  @Input() staffId!: string;
  staffAddress$!: Observable<StaffAddress[]>;
  constructor(
    private readonly addressService: AddressService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.staffAddress$ = this.addressService.searchByStaffId(this.staffId);
  }

  addDetail() {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.addressService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffAddress) {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.addressService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
