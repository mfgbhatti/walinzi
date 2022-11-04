import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subcontractor } from 'src/app/control/subcontractors/shared';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.scss']
})
export class SubFormComponent implements OnInit {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<SubFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly sub: Subcontractor
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      name: [this.sub.name, [Validators.required, Validators.minLength(10)]],
      short_code: [this.sub.short_code, [Validators.required, Validators.maxLength(3)]],
      phone: [this.sub.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      first_line: [this.sub.first_line, [Validators.required]],
      second_line: [this.sub.second_line, [Validators.required]],
      post_code: [this.sub.post_code, [Validators.required]],
      email: [this.sub.email, [Validators.email]],
      pay_rate: [this.sub.pay_rate, [Validators.required]],
      status: [this.sub.status, [Validators.required]]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.sub, ...this.form.value });
  }

}
