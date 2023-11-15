import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

import { Customer } from '@shared/interfaces/customer.types';
import { Location } from '@shared/interfaces/location.types';
import { CustomerService } from 'src/app/customer/data-access/customer.services';

@Component({
  selector: 'create-location',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateLocationComponent {
  form!: UntypedFormGroup;
  customers$!: Observable<Customer[] | null>;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    private readonly _customerService: CustomerService,
    public readonly dialogRef: MatDialogRef<CreateLocationComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Location
  ) { }

  ngOnInit(): void {
    this.customers$ = this._customerService.getAll();
    this.setForm();
  }

  setForm() {
    this.form = this.formbuilder.group({
      name: [this.data.name, [Validators.required, Validators.minLength(5)]],
      land_line: [this.data.land_line, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      mobile: [this.data.mobile],
      address: [this.data.address, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      post_code: [this.data.post_code, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      is_active: [this.data.is_active, [Validators.required]],
      charge_rate: [this.data.charge_rate, [Validators.required, Validators.min(0)]],
      reference: [this.data.reference],
      customer: [this.data.customer, [Validators.required]],
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
