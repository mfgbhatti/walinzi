import { Component, Inject } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Guard } from '@shared/interfaces/guard.types';
import { Shift } from '@shared/interfaces/shift.types';
import { GuardService } from 'src/app/guard/data-access/guard.services';
import { LocationService } from 'src/app/location/data-access/location.service';
import { Location } from '@shared/interfaces/location.types';

@Component({
  selector: 'create-shift',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateShiftComponent {
  form!: UntypedFormGroup;
  locations$!: Observable<Location[]>;
  guards$!: Observable<Guard[]>;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<CreateShiftComponent>,
    private _locationService: LocationService,
    private _guardService: GuardService,
    @Inject(MAT_DIALOG_DATA) private readonly data: Shift
  ) {}

  ngOnInit(): void {
    this.locations$ = this._locationService.locations$;
    this.guards$ = this._guardService.guards$;
    this.setForm();
    this.getTime();
  }

  setForm() {
    this.form = this.formbuilder.group({
      start_time: [],
      end_time: [],
      location: [this.data.location],
      staff: this.formbuilder.array([]),
      break_duration: [this.data.break_duration],
      time_in: [this.data.time_in],
      duration: [],
      is_active: [this.data.is_active, Validators.required],
    });

    const staffArray = this.form.get('staff') as FormArray
    this.data.timesheet.forEach((entry) => {
      staffArray.push(this.formbuilder.control(entry.staff))
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }

  getTimeAsString(date: Date) {
    const new_date = new Date(date);
    return `${(new_date.getHours() < 10 ? '0' : '') + new_date.getHours()}:${
      (new_date.getMinutes() < 10 ? '0' : '') + new_date.getMinutes()
    }`;
  }

  getDuration(start_date: Date, end_date: Date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    // let duration = end_date.getTime() - start_date.getTime()
    let duration = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(duration / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
    // console.log(hours)
    return `${(hours < 10 ? '0' : '') + hours}:${
      (minutes < 10 ? '0' : '') + minutes
    }`;
  }

  getTime() {
    if (this.data) {
      const startTime = this.getTimeAsString(this.data.time_in);
      const endTime = this.getTimeAsString(this.data.time_out);

      this.form.get('start_time')!.setValue(startTime);
      this.form.get('end_time')!.setValue(endTime);

      this.form
        .get('duration')!
        .setValue(this.getDuration(this.data.time_in, this.data.time_out));
    }
  }
  calculateDuration() {}
}
