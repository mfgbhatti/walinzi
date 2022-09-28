import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Clients } from 'src/app/clients/shared';

interface matDialogData {
  clients: Clients[];
  site: {
    name: string;
    id: string;
    clientId: string;
    sin: string;
    location: string;
    started: Date;
    finished: Date;
    status: boolean;
    address: string;
    post_code: string;
  }
}
@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})

export class SiteFormComponent implements OnInit {
  form!: UntypedFormGroup;
  selectedClient!: string;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]
  startDate!: Date;
  endDate!: Date;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<SiteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: matDialogData
  ) {
    this.startDate = this.data.site.started;
    this.setForm();

   }

  ngOnInit(): void {
  }

  setForm () {
    this.form = this.formbuilder.group({
      name: [this.data.site.name, [Validators.required]],
      clientId: [this.data.site.clientId, [Validators.required]],
      sin: [this.data.site.sin, [Validators.required]],
      started: [new Date(), [Validators.required]],
      finished: [this.data.site.finished],
      status: [this.data.site.status = true, [Validators.required]],
      address: [this.data.site.address],
      post_code: [this.data.site.post_code, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data.site, ...this.form.value });
  }

}
