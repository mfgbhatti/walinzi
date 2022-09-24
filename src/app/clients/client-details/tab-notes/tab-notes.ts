import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ClientsService } from "src/app/clients/shared";

@Component({
  selector: 'app-client-note',
  templateUrl: './tab-notes.html',
  styleUrls: ['./tab-notes.scss']
})

export class ClientTabNoteComponent implements OnInit {
  @Input () clientId!: string;
  form!: FormGroup;


  constructor( 
    private readonly formbuilder: FormBuilder,
    private readonly db: ClientsService
    ) {
    this.setForm;
  }

  setForm() {
    this.form = this.formbuilder.group({
      clientId: [this.clientId, [Validators.required]],
      note: ['', [Validators.required]]
    })
  }
  add() {
    // this.db.addNotes("test");
  }

  ngOnInit(): void {

  }
}