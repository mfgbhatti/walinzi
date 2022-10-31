import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffVetting } from 'src/app/staff/shared';

@Component({
  selector: 'app-vetting-form',
  templateUrl: './vetting-form.component.html',
  styleUrls: ['./vetting-form.component.scss'],
})
export class VettingFormComponent implements OnInit {
  form!: UntypedFormGroup;
  vettingStarted!: FormControl;
  vettingFinished!: FormControl;
  contractStarted!: FormControl;
  contractFinished!: FormControl;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<VettingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffVetting
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  addWeeks(weeks: number) {
    let result = new Date();
    result.setDate(result.getDate() + weeks * 7);
    return result;
  }

  isVettingStarted() {
    if (this.data.vetting_started == undefined) {
      this.vettingStarted = new FormControl(new Date());
    } else {
      this.vettingStarted = new FormControl(
        new Date(this.data.vetting_started.toDate())
      );
    }
  }

  isVettingFinished() {
    if (this.data.vetting_finished == undefined) {
      this.vettingFinished = new FormControl(new Date(this.addWeeks(12)));
    } else {
      this.vettingFinished = new FormControl(
        new Date(this.data.vetting_finished.toDate())
      );
    }
  }

  isContractStarted() {
    if (this.data.contract_started == undefined) {
      this.contractStarted = new FormControl(new Date());
    } else {
      this.contractStarted = new FormControl(
        new Date(this.data.contract_started.toDate())
      );
    }
  }

  iscontractFinished() {
    if (this.data.contract_finished == undefined) {
      this.contractFinished = new FormControl(null);
    } else {
      this.contractFinished = new FormControl(
        new Date(this.data.contract_finished.toDate())
      );
    }
  }

  startDates() {
    this.isVettingStarted();
    this.isVettingFinished();
    this.isContractStarted();
    this.iscontractFinished();
  }

  setForm() {
    this.startDates();
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      vetting_started: [this.vettingStarted.value, [Validators.required]],
      vetting_finished: [this.vettingFinished.value, [Validators.required]],
      contract_started: [this.contractStarted.value, [Validators.required]],
      contract_finished: [this.contractFinished.value, [Validators.required]],
      submitted: [true, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
