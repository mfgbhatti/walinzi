import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Guard } from '@shared/interfaces/guard.types';
import { Subcontractor } from '@shared/interfaces/subcontractor.types';
import { Observable } from 'rxjs';
import { SubcontractorService } from 'src/app/subcontractor/data-access/subcontractor.services';

@Component({
  selector: 'create-guard',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateGuardComponent {
  form!: UntypedFormGroup;
  subcontractors$!: Observable<Subcontractor[]>;

  status_list: Array<any> = [
    { status: true, label: 'Active' },
    { status: false, label: 'Inactive' },
  ];

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    private readonly _subcontractorService: SubcontractorService,
    public readonly dialogRef: MatDialogRef<CreateGuardComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Guard
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.subscribeToFormChanges();
    this.subcontractors$ = this._subcontractorService.subcontractors$;
  }

  setForm() {
    this.form = this.formbuilder.group({
      first_name: [
        this.data.first_name,
        [Validators.required, Validators.minLength(4)],
      ],
      last_name: [
        this.data.last_name,
        [Validators.required, Validators.minLength(4)],
      ],
      subcontractor: [this.data.subcontractor],
      display_name: [this.data.display_name],
      pay_rate: [this.data.pay_rate],
      is_active: [this.data.is_active, Validators.required],
    });
  }

  subscribeToFormChanges() {
    // Subscribe to changes in first_name, last_name, and subcontractor
    this.form.get('first_name')!.valueChanges.subscribe(() => {
      this.updateDisplayName();
    });

    this.form.get('last_name')!.valueChanges.subscribe(() => {
      this.updateDisplayName();
    });

    this.form.get('subcontractor')!.valueChanges.subscribe(() => {
      this.updateDisplayName();
    });
  }

  getSubcontractor(name: string) {
    this.selectedSubcontractor(name);
  }

  selectedSubcontractor(name: string) {
    console.log(name);
  }

  updateDisplayName() {
    const firstName = this.form.get('first_name')!.value;
    const lastName = this.form.get('last_name')!.value;
    const isSubcontractor = this.form.get('subcontractor')!.value;

    let displayName = '';
    if (firstName) {
      displayName = `${firstName}`
    }
    if (lastName){
      displayName += ` ${lastName}`
    }

    // if (isSubcontractor) {
    //   // Abbreviation logic for subcontractor
    //   // displayName = `${firstName.charAt(0)}${lastName.charAt(1)}`;
    //   displayName = `${firstName} ${lastName}`;
    // } else {
    //   // Space-separated full name for regular user
    //   displayName = `${firstName} ${lastName}`;
    // }

    // Set the updated display_name value
    this.form.get('display_name')!.setValue(displayName);
  }

  getDisplayName() {
    const firstName = this.form.get('first_name')!.value;
    const lastName = this.form.get('last_name')!.value;
    const isSubcontractor = this.form.get('subcontractor')!.value;

    if (isSubcontractor) {
      // Abbreviation logic for subcontractor
      // return `${firstName.charAt(0)}${lastName.charAt(1)}`;
      return `${firstName} ${lastName}`;
    } else {
      // Space-separated full name for regular user
      return `${firstName} ${lastName}`;
    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
