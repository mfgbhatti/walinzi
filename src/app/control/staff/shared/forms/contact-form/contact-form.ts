import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ContactPerson } from "src/app/_shared";

@Component({
  selector: 'app-staff-contact-form',
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})

export class ContactFormComponent implements OnInit {
  form!: UntypedFormGroup;
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Others'];
  relations: string[] = [
    'father',
    'mother',
    'brother',
    'sister',
    'son',
    'daughter',
    'husband',
    'wife'
  ];

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly contact: ContactPerson
  ) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      relative_id: [this.contact.relative_id, [Validators.required]],
      title: [this.contact.title, [Validators.required]],
      name: [this.contact.name, [Validators.required]],
      phone: [this.contact.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [this.contact.email, [Validators.email]],
      job: [this.contact.job],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.contact, ...this.form.value })
  }

  close() {
    this.dialogRef.close();
  }
}