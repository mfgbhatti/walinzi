import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, of, switchMap, takeUntil } from 'rxjs';

import { CreateShiftComponent } from '../ui/create/create.component';
import { Destroy } from '@shared/utils/destroy';
import { ShiftService } from '../data-access/shift.services';

@Component({
  selector: 'app-guard',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  providers: [Destroy]
})
export class ShiftComponent {
  private _shiftService = inject(ShiftService);
  private readonly dialog = inject(MatDialog);
  private readonly _destroy = inject(Destroy);


  add() {
    const dialogRef = this.dialog.open(CreateShiftComponent, {
      data: {},
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        catchError((err) => {
          console.log('There is an error:', err);
          return of(null);
        }),
        switchMap((guard) => this._shiftService.create(guard)),
        takeUntil(this._destroy)
      )
      .subscribe();
  }
}
