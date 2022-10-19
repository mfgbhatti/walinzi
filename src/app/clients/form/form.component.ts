import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Client } from 'src/app/clients/shared';

@Component({
  selector: 'app-clients-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Client
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      name: [this.data.name, [Validators.required, Validators.minLength(5)]],
      phone: [this.data.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      mobile: [this.data.mobile],
      address: [this.data.address, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      post_code: [this.data.post_code, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      status: [this.data.status, [Validators.required]]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
