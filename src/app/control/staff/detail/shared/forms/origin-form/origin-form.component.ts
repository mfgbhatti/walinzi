import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { StaffOrigin } from 'src/app/control/staff/shared';

import {
  Countries,
  Country,
  Genders,
  OriginGroups,
  Titles,
} from 'src/app/_shared';

@Component({
  selector: 'app-origin-form',
  templateUrl: './origin-form.component.html',
  styleUrls: ['./origin-form.component.scss'],
})
export class OriginFormComponent implements OnInit {
  form!: UntypedFormGroup;
  birthDate!: UntypedFormControl;

  title$ = Titles;
  gender$ = Genders;
  originGroup$ = OriginGroups;
  countrie$: Country[] = Countries;
  filteredOptions!: Observable<Country[]>;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    public readonly dialogref: MatDialogRef<OriginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StaffOrigin
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.filteredOptions = this.form.controls['nationality'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  setDate() {
    if (this.data.date_of_birth == undefined) {
      this.birthDate = new UntypedFormControl(new Date());
    } else {
      this.birthDate = new UntypedFormControl(
        new Date(this.data.date_of_birth.toDate())
      );
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.countrie$.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  setForm() {
    this.setDate();
    this.form = this.formBuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      gender: [this.data.gender, [Validators.required]],
      ethnic_origin: [this.data.ethnic_origin, [Validators.required]],
      place_of_birth: [this.data.place_of_birth, [Validators.required]],
      nationality: [this.data.nationality, [Validators.required]],
      date_of_birth: [this.birthDate.value, [Validators.required]],
      submitted: [true, [Validators.required]],
    });
  }

  submit() {
    this.dialogref.close({ ...this.data, ...this.form.value });
  }
  close() {
    this.dialogref.close();
  }
}
