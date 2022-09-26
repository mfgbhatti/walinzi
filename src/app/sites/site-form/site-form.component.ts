import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Site } from '../shared';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  form!: UntypedFormGroup;
  status_list: Array<any> = [
    { status: true, label: "Active" },
    { status: false, label: "Inactive" }
  ]

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<SiteFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly site: Site
  ) { }

  ngOnInit(): void {
  }

  setForm () {
    this.form = this.formbuilder.group({
      clientId: [this.site.clientId, [Validators.required]],
      clientName: [this.site.clientName, [Validators.required]],
      sin: [this.site.sin, [Validators.required]],
      location: [this.site.location, [Validators.required]],
      started: [this.site.started, [Validators.required]],
      finished: [this.site.finished, [Validators.required]],
      status: [this.site.status = true, [Validators.required]],
      address: [this.site.address, [Validators.required]],
      post_code: [this.site.post_code, [Validators.required]],
    });
  }

}
