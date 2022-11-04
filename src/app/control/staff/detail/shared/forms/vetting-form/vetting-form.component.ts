import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffVetting } from 'src/app/control/staff/shared';

@Component({
  selector: 'app-vetting-form',
  templateUrl: './vetting-form.component.html',
  styleUrls: ['./vetting-form.component.scss'],
})
export class VettingFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<VettingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffVetting
  ) {}

  ngOnInit(): void {
    this.setForm();
    if (this.data.vetting_started == undefined) {
      this.form.controls['vetting_started'].setValue(new Date());
      this.form.controls['contract_started'].setValue(new Date());
      this.form.controls['vetting_finished'].setValue(
        new Date(this.addWeeks(12))
      );
    } else {
      this.form.controls['vetting_finished'].setValue(
        this.data.vetting_finished.toDate()
      );
      this.form.controls['vetting_started'].setValue(new Date(this.data.vetting_started.toDate()));
      this.form.controls['contract_started'].setValue(new Date(this.data.contract_started.toDate()));

    }
    if(this.data.contract_finished !== null) {
    this.form.controls['contract_finished'].setValue(new Date(this.data.contract_finished.toDate()));
    }
  }

  addWeeks(weeks: number) {
    let result = new Date();
    result.setDate(result.getDate() + weeks * 7);
    return result;
  }

  setForm() {
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      vetting_started: [this.data.vetting_started, [Validators.required]],
      vetting_finished: [this.data.vetting_finished, [Validators.required]],
      contract_started: [this.data.contract_started, [Validators.required]],
      contract_finished: [this.data.contract_finished],
      submitted: [true, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
