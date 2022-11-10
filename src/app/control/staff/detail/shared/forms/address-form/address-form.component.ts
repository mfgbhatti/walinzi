import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffAddress } from 'src/app/control/staff/shared';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffAddress
  ) {}

  ngOnInit(): void {
    this.setForm();
    if (
      this.data.living_from == undefined ||
      this.data.living_to == undefined
    ) {
      this.form.controls['living_from'].setValue(new Date());
      this.form.controls['living_to'].setValue(new Date());
    } else {
      this.form.controls['living_from'].setValue(
        new Date(this.data.living_from.toDate())
      );
      this.form.controls['living_to'].setValue(
        new Date(this.data.living_to.toDate())
      );
    }
  }

  setForm() {
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      living_from: [this.data.living_from, [Validators.required]],
      living_to: [this.data.living_to, [Validators.required]],
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
