import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Clients } from 'src/app/_modals';

@Component({
  selector: 'app-clients-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ClientFormComponent implements OnInit {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly client: Clients
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      name: [this.client.name, [Validators.required, Validators.minLength(10)]],
      phone: [this.client.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      mobile: [this.client.mobile],
      first_line: [this.client.first_line, [Validators.required]],
      second_line: [this.client.second_line, [Validators.required]],
      post_code: [this.client.post_code, [Validators.required]],
      email: [this.client.email, [Validators.required, Validators.email]],
      status: [this.client.status = true, [Validators.required]]
    })
  }

  submit() {
    this.dialogRef.close({ ...this.client, ...this.form.value });
  }
}
