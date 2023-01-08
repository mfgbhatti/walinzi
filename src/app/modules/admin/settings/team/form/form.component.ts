import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export type Role = {
  label: string;
  value: string;
}

type Group = {
  name: string;
  id: number;
}

type User = {
  customer: string;
  email: string;
  name: string;
  groups: Group[];
}

@Component({
  selector: "users-form",
  templateUrl: "./form.component.html",

})

export class UserFormComponent implements OnInit {
  form!: UntypedFormGroup
  roles: Role[] = [{
    label: "Controller",
    value: "control",
  }, {
    label: "Human Resources",
    value: "humres",
  }, {
    label: "Accounts",
    value: "accounts",
  }, {
    label: "Admin",
    value: "admin",
  }];
  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    public readonly _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: User
  ) { }
  ngOnInit(): void {
    this.setForm()
  }

  setForm(): void {
    this.form = this._formBuilder.group({
      customer: [this.data.customer],
      email: [this.data.email, Validators.required],
      name: [this.data.name, Validators.required],
      groups: [this.data.groups, Validators.required],
    })
  }

  close(): void {
    this._dialogRef.close()
  }

  submit(): void {
    this._dialogRef.close({ ...this.data, ...this.form.value })
  }
}