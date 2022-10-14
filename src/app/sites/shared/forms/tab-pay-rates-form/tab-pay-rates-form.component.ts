import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayRate } from '../../modals';
import { StaffPosition } from 'src/app/_shared';

@Component({
  selector: 'app-tab-pay-rates-form',
  templateUrl: './tab-pay-rates-form.component.html',
  styleUrls: ['./tab-pay-rates-form.component.scss']
})
export class TabPayRatesFormComponent implements OnInit {
  form!: UntypedFormGroup;
  rateType = StaffPosition;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabPayRatesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly rate: PayRate
  ) {
    this.setForm();
  }

  ngOnInit(): void {

  }

  setForm() {
    this.form = this.fb.group({
      relative_id: [this.rate.relative_id],
      type: [this.rate.type, [Validators.required]],
      pay_rate: [this.rate.pay_rate, [Validators.required]]
    })

  }

  submit() {
    this.dialogRef.close({ ...this.rate, ...this.form.value })
  }

  close() {
    this.dialogRef.close();
  }

}
