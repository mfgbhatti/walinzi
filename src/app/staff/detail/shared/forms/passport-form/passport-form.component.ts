import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
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
  isssued!: FormControl;
  expired!: FormControl;
  issueCountry!: FormControl;
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
  }

  setIssueCountry() {
    if (this.data.country_of_issue == undefined) {
      this.issueCountry = new FormControl('');
    } else {
      this.issueCountry = new FormControl(this.data.country_of_issue);
    }

    this.filteredOptions = this.issueCountry.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.countrie$.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  setIssued() {
    if (this.data.issued == undefined) {
      this.isssued = new FormControl(new Date());
    } else {
      this.isssued = new FormControl(new Date(this.data.issued.toDate()));
    }
  }

  setExpired() {
    if (this.data.expired == undefined) {
      this.expired = new FormControl(null);
    } else {
      this.expired = new FormControl(new Date(this.data.expired.toDate()));
    }
  }

  setForm() {
    this.setIssued();
    this.setExpired();
    this.setIssueCountry();
    this.form = this.formbuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      passport_no: [this.data.passport_no, [Validators.required]],
      country_of_issue: [this.data.country_of_issue, [Validators.required]],
      issued: [this.isssued.value, [Validators.required]],
      expired: [this.expired.value, [Validators.required]],
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
