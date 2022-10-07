import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Staff } from '../shared';
import { StaffPosition } from 'src/app/_shared';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: UntypedFormGroup;
  positions = StaffPosition;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Staff
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      first_name: [this.data.first_name, [Validators.required]],
      last_name: [this.data.last_name, [Validators.required]],
      phone: [this.data.phone, [ Validators.pattern('[- +()0-9]+')]],
      mobile: [this.data.mobile, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [this.data.email, [Validators.email]],
      pay_rate: [this.data.pay_rate, [Validators.required]],
      status: [this.data.status, [Validators.required]],
      contractorId: [this.data.contractorId],
      contractorName: [this.data.contractorName],
      position: [this.data.position],
      sia_number: [this.data.sia_number],
      pin: [this.data.pin],
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }

}
