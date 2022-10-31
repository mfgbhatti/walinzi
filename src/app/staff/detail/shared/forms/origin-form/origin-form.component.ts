import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { StaffOrigin } from 'src/app/staff/shared';

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
  dobControl!: FormControl;
  nationalityControl!: FormControl;

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
  }

  setForm() {
    this.setDate();
    this.setNationality();
    this.form = this.formBuilder.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      gender: [this.data.gender, [Validators.required]],
      ethnic_origin: [this.data.ethnic_origin, [Validators.required]],
      place_of_birth: [this.data.place_of_birth, [Validators.required]],
      nationality: [this.nationalityControl.value, [Validators.required]],
      date_of_birth: [this.dobControl.value, [Validators.required]],
      submitted: [true, [Validators.required]],
    });
  }

  setDate() {
    if (this.data.date_of_birth == undefined) {
      this.dobControl = new FormControl(null);
    } else {
      this.dobControl = new FormControl(
        new Date(this.data.date_of_birth.toDate())
      );
    }
  }

  setNationality() {
    if (this.data.nationality == undefined) {
      this.nationalityControl = new FormControl('');
    } else {
      this.nationalityControl = new FormControl(this.data.nationality);
    }

    this.filteredOptions = this.nationalityControl.valueChanges.pipe(
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

  submit() {
    this.dialogref.close({ ...this.data, ...this.form.value });
  }
  close() {
    this.dialogref.close();
  }
}
