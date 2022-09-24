import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ClientContactPerson } from "src/app/clients/shared";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})

export class ClientTabContactFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ClientTabContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly contact: ClientContactPerson
  ) {
    this.setForm();
  }
  setForm() {
    this.form = this.fb.group({
      clientId: [this.contact.clientId, [Validators.required]],
      name: [this.contact.name, [Validators.required]],
      phone: [this.contact.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.contact, ...this.form.value })
  }

  ngOnInit(): void {

  }
}