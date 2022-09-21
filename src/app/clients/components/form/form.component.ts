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
      name: [this.client.name, [Validators.required]],
      phone: [this.client.phone, [Validators.required]],
      mobile: [this.client.mobile],
      first_line: [this.client.first_line, [Validators.required]],
      second_line: [this.client.second_line, [Validators.required]],
      post_code: [this.client.post_code, [Validators.required]],
      email: [this.client.email, [Validators.required]],
      status: [this.client.status, [Validators.required]]
    })
  }

  submit() {
    this.dialogRef.close({ ...this.client, ...this.form.value });
    // console.log({ ...this.client, ...this.form.value });
    // this.dialogRef.close("test");
  }
}
