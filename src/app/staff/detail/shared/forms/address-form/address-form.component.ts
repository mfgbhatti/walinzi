import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService, StaffAddress } from 'src/app/staff/shared';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  form!: UntypedFormGroup;
  started!: FormControl;
  finished!: FormControl;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffAddress
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  isStarted() {
    if (this.data.living_from == undefined) {
      this.started = new FormControl(new Date());
    } else {
      this.started = new FormControl(new Date(this.data.living_from.toDate()));
    }
  }

  isFinished() {
    if (this.data.living_to == undefined) {
      this.finished = new FormControl(null);
    } else {
      this.finished = new FormControl(new Date(this.data.living_to.toDate()));
    }
  }

  setForm() {
    this.isStarted();
    this.isFinished();
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      living_from: [this.started.value, [Validators.required]],
      living_to: [this.finished.value, [Validators.required]],
      address: [this.data.address, [Validators.required]],
      post_code: [this.data.post_code, [Validators.required]],
      city: [this.data.city, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
