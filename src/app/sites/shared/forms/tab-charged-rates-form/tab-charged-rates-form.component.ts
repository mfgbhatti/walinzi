import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChargedRate } from 'src/app/sites/shared';
import { StaffPosition } from 'src/app/_shared';

@Component({
  selector: 'app-tab-charged-rates-form',
  templateUrl: './tab-charged-rates-form.component.html',
  styleUrls: ['./tab-charged-rates-form.component.scss']
})
export class TabChargedRatesFormComponent implements OnInit {
  form!: UntypedFormGroup;
  rateType= StaffPosition;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabChargedRatesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly rate: ChargedRate
  ) {
    this.setForm();
  }

  ngOnInit(): void {

  }

  setForm() {
    this.form = this.fb.group({
      relative_id: [this.rate.relative_id],
      type: [this.rate.type, [Validators.required]],
      charged_rate: [this.rate.charged_rate, [Validators.required]]
    })

  }

  submit() {
    this.dialogRef.close({ ...this.rate, ...this.form.value })
  }

  close() {
    this.dialogRef.close();
  }

}
