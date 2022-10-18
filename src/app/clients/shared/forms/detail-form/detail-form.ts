import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

type detail = {
  relative_id: string;
  vat: string;
  website: string;
  submitted: boolean;
}
@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.html',
  styleUrls: ['./detail-form.scss']
})

export class TabDetailFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: detail
  ) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      relative_id: [this.data.relative_id, [Validators.required]],
      vat: [this.data.vat, [Validators.required, Validators.pattern('[0-9]+')]],
      website: [this.data.website, [Validators.required, Validators.min(5)]],
      submitted: [true, [Validators.required]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value })
  }

}