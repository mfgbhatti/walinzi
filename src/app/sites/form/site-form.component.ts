import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

import { Client, ClientService } from 'src/app/clients/shared';
import { Site } from 'src/app/sites/shared';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: 'Active' },
    { status: false, label: 'Inactive' },
  ];
  client$!: Observable<Client[]>;
  started!: UntypedFormControl;
  finished!: UntypedFormControl;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<SiteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Site,
    private readonly clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.client$ = this.clientService.getAll();
  }

  isStarted() {
    if (this.data.started == undefined) {
      this.started = new UntypedFormControl(new Date());
    } else {
      this.started = new UntypedFormControl(new Date(this.data.started.toDate()));
    }
  }

  isFinished() {
    if (this.data.finished == undefined) {
      this.finished = new UntypedFormControl(null);
    } else {
      this.finished = new UntypedFormControl(new Date(this.data.finished.toDate()));
    }
  }

  setForm() {
    this.isStarted();
    this.isFinished();
    this.form = this.formbuilder.group({
      name: [this.data.name, [Validators.required]],
      relative_id: [this.data.relative_id, [Validators.required]],
      sin: [this.data.sin, [Validators.required]],
      started: [this.started.value, [Validators.required]],
      finished: [this.finished.value],
      status: [this.data.status, [Validators.required]],
      address: [this.data.address],
      city: [this.data.city],
      post_code: [this.data.post_code, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}
