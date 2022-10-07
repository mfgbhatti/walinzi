import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayRate, RateTypes } from '../../modals';

@Component({
  selector: 'app-tab-pay-rates-form',
  templateUrl: './tab-pay-rates-form.component.html',
  styleUrls: ['./tab-pay-rates-form.component.scss']
})
export class TabPayRatesFormComponent implements OnInit {
  form!: UntypedFormGroup;
  rateType = RateTypes;

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
      relativeId: [this.rate.relativeId],
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
