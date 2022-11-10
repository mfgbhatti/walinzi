import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StaffEmployment } from 'src/app/control/staff/shared';
import { Titles } from 'src/app/_shared';

@Component({
  selector: 'app-employment-form',
  templateUrl: './employment-form.component.html',
  styleUrls: ['./employment-form.component.scss'],
})
export class EmploymentFormComponent implements OnInit {
  form!: UntypedFormGroup;
  filteredOptions!: Observable<StaffEmployment[]>;
  titles = Titles;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<EmploymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffEmployment
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id],
      name: [this.data.name, [Validators.required]],
      job_title: [this.data.job_title],
      address: [this.data.address, [Validators.required]],
      post_code: [this.data.post_code, [Validators.required]],
      contact_person: [this.data.contact_person, [Validators.required]],
      phone: [this.data.phone, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      from: [this.data.from, [Validators.required]],
      to: [this.data.to, [Validators.required]],
      reason_for_leaving: [this.data.reason_for_leaving, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
