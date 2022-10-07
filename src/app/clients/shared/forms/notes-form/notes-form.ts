import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Notes } from "src/app/_shared";

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.html',
  styleUrls:['./notes-form.scss']
})

export class TabNotesFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabNotesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly note: Notes
  ) {
    this.setForm();
  }
  setForm() {
    this.form = this.fb.group({
      relativeId: [this.note.relativeId, [Validators.required]],
      note: [this.note.note, [Validators.required]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.note, ...this.form.value })
  }

  ngOnInit(): void {

  }
}