import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Staff } from '../shared';
import { StaffPosition } from 'src/app/_shared';
import { Subcontractor, SubcontractorService } from 'src/app/subcontractors/shared';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: UntypedFormGroup;
  positions = StaffPosition;
  subContr$!: Observable<Subcontractor[]>
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]
  added!: FormControl;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<FormComponent>,
    private readonly subcontractService: SubcontractorService,
    @Inject(MAT_DIALOG_DATA) private readonly data: Staff
  ) { }

  ngOnInit(): void {
    this.subContr$ = this.subcontractService.getAll();
    this.setForm();
  }

  setDate() {
    if (this.data.added == undefined) {
      this.added = new FormControl(new Date());
    } else {
      this.added = new FormControl(this.data.added.toDate());
    }
  }

  setForm() {
    this.setDate();
    this.form = this.formbuilder.group({
      first_name: [this.data.first_name, [Validators.required]],
      last_name: [this.data.last_name, [Validators.required]],
      phone: [this.data.phone, [Validators.pattern('[- +()0-9]+')]],
      mobile: [this.data.mobile, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [this.data.email, [Validators.email]],
      pay_rate: [this.data.pay_rate, [Validators.required]],
      status: [this.data.status, [Validators.required]],
      contractor_id: [this.data.contractor_id],
      position: [this.data.position],
      sia_number: [this.data.sia_number],
      pin: [this.data.pin],
      added: [this.added.value]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }

}
