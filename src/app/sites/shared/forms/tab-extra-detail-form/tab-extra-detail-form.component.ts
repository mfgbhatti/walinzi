import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExtraDetail } from 'src/app/_shared';

@Component({
  selector: 'app-tab-extra-detail-form',
  templateUrl: './tab-extra-detail-form.component.html',
  styleUrls: ['./tab-extra-detail-form.component.scss']
})
export class TabExtraDetailFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabExtraDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly detail: ExtraDetail
  ) {
    this.setForm();
  }

  ngOnInit(): void {

  }

  setForm() {
    this.form = this.fb.group({
      relativeId: [this.detail.relativeId],
      title: [this.detail.title, [Validators.required]],
      description: [this.detail.description, [Validators.required]]
    })

  }

  submit() {
    this.dialogRef.close({ ...this.detail, ...this.form.value })
  }

  close() {
    this.dialogRef.close();
  }

}
