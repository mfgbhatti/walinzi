import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ClientNotes } from "src/app/clients/shared";

@Component({
  selector: 'app-notes-form',
  template: './notes-form.html',
  styleUrls:['./notes-form.scss']
})

export class ClientTabNotesFormComponent implements OnInit {
  form!: UntypedFormGroup;
  @Input() clientId$!: string;

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<ClientTabNotesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly note: ClientNotes
  ) {
    this.setForm();
  }
  setForm() {
    this.form = this.fb.group({
      clientId: [this.clientId$, [Validators.required]],
      note: [this.note.note, [Validators.required]],
    })

  }

  submit() {
    this.dialogRef.close({ ...this.note, ...this.form.value })
  }

  ngOnInit(): void {

  }
}