import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Notes } from 'src/app/_shared';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.html',
  styleUrls: ['./notes-form.scss'],
})
export class TabNotesFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<TabNotesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly note: Notes
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      relative_id: [this.note.relative_id, [Validators.required]],
      note: [this.note.note, [Validators.required]],
    });
  }

  submit() {
    this.dialogRef.close({ ...this.note, ...this.form.value });
  }

  close() {
    this.dialogRef.close();
  }
}
