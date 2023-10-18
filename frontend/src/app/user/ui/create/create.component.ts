import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '@shared/interfaces/user.types';

@Component({
  selector: 'user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: User
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      first_name: [this.data.first_name, [Validators.required, Validators.minLength(5)]],
      last_name: [this.data.last_name, [Validators.required, Validators.minLength(5)]],
      phone: [this.data.phone, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      client: [this.data.client]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
