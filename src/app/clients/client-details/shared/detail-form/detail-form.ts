import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ClientDetails } from "src/app/clients/shared";

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.html',
  styleUrls: ['./detail-form.scss']
})

export class ClientTabDetailFormComponent implements OnInit {
  form!: UntypedFormGroup;
  @Input() clientId$!: string;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ClientTabDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly details: ClientDetails
  ) {
    this.setForm();
  }
  setForm() {
    this.form = this.fb.group({
      clientId: [this.details.clientId, [Validators.required]],
      website: [this.details.website, [Validators.required, Validators.min(8)]],
      vat: [this.details.vat, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      submitted: [true, [Validators.required]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.details, ...this.form.value })
    console.log(this.details)
  }

  ngOnInit(): void {

  }
}