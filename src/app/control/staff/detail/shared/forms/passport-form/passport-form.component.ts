import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { StaffPassport } from 'src/app/staff/shared';
import { Countries, Country } from 'src/app/_shared';

@Component({
  selector: 'app-passport-form',
  templateUrl: './passport-form.component.html',
  styleUrls: ['./passport-form.component.scss'],
})
export class PassportFormComponent implements OnInit {
  form!: UntypedFormGroup;
  filteredOptions!: Observable<Country[]>;

  options: string[] = ['yes', 'no'];
  countrie$: Country[] = Countries;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<PassportFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffPassport
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.filteredOptions = this.form.controls[
      'country_of_issue'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    if (this.data.issued == undefined || this.data.expired == undefined){
      this.form.controls['issued'].setValue(new Date())
      this.form.controls['expired'].setValue(new Date())
    } else {
      this.form.controls['issued'].setValue(new Date(this.data.issued.toDate()))
      this.form.controls['expired'].setValue(new Date(this.data.expired.toDate()))
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.countrie$.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }


  setForm() {
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      passport_no: [this.data.passport_no, [Validators.required]],
      country_of_issue: [this.data.country_of_issue, [Validators.required]],
      issued: [this.data.issued, [Validators.required]],
      expired: [this.data.expired, [Validators.required]],
      visa: [this.data.visa, [Validators.required]],
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
