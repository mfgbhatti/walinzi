import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactPerson } from 'src/app/_shared';

@Component({
  selector: 'app-tab-contact-person-form',
  templateUrl: './tab-contact-person-form.component.html',
  styleUrls: ['./tab-contact-person-form.component.scss']
})
export class TabContactPersonFormComponent implements OnInit {
  form!: UntypedFormGroup;
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Mx', 'Others'];
  jobs: string[] = [
    'Manager', 
    'Operations', 
    'Customer Relations', 
    'Security Guard',
    'Sales',
    'Owner'
  ];

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabContactPersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly contact: ContactPerson
  ) {
    this.setForm();
  }

  ngOnInit(): void {

  }

  setForm() {
    this.form = this.fb.group({
      relativeId: [this.contact.relativeId, [Validators.required]],
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
