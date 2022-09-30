import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ClientNotes } from "src/app/clients/shared";

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.html',
  styleUrls:['./notes-form.scss']
})

export class ClientTabNotesFormComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ClientTabNotesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly note: ClientNotes
  ) {
    this.setForm();
  }
  setForm() {
    this.form = this.fb.group({
      clientId: [this.note.clientId, [Validators.required]],
      note: [this.note.note, [Validators.required]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.note, ...this.form.value })
  }

  ngOnInit(): void {

  }
}