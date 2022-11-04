import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffBankDetail } from 'src/app/control/staff/shared';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss'],
})
export class BankFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<BankFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffBankDetail,
  ) {}

  ngOnInit(): void {
    this.setForm();
  }


  setForm() {
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      bank_name: [this.data.bank_name, [Validators.required]],
      account_title: [this.data.account_title, [Validators.required]],
      bank_account: [this.data.bank_account, [Validators.required, Validators.pattern('[0-9]{8}'), Validators.minLength(8), Validators.maxLength(8)]],
      sort_code: [this.data.sort_code, [Validators.required, Validators.pattern('[0-9]{6}'), Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
