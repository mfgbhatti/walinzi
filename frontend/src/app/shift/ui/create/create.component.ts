import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Shift } from '@shared/interfaces/shift.types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateShiftComponent {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<CreateShiftComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Shift
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      time_in: [this.data.time_in],
      time_out: [this.data.time_out],
      location: [this.data.location],
      break_duration: [this.data.break_duration],
      is_active: [this.data.is_active, Validators.required]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
