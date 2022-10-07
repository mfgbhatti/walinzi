import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Clients, ClientsService } from 'src/app/clients/shared';
import { Site } from 'src/app/sites/shared';

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
  client$!: Observable<Clients[]>;
  started!: FormControl;
  selectedClient!: Clients;

  constructor(
    private readonly formbuilder: UntypedFormBuilder,
    public readonly dialogRef: MatDialogRef<SiteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Site,
    private readonly clientService: ClientsService
  ) {
    this.setForm();
  }
  
  ngOnInit(): void {
    this.client$ = this.clientService.getAll();
  }
  
  setForm () {
    if (this.data.started == undefined) {
      this.started = new FormControl(new Date())
    } else {
      this.started = new FormControl(new Date(this.data.started.toDate()));
    }
    this.form = this.formbuilder.group({
      name: [this.data.name, [Validators.required]],
      clientId: [this.data.clientId, [Validators.required]],
      sin: [this.data.sin, [Validators.required]],
      started: [this.started.value, [Validators.required]],
      finished: [this.data.finished],
      status: [this.data.status, [Validators.required]],
      address: [this.data.address],
      post_code: [this.data.post_code, [Validators.required]],
      // clientName: [this.clientName.nativeElement.value]
    });
  }

  close() {
    this.dialogRef.close();
  }

  getClientName(value: Clients) {
    this.selectedClient = value;
    console.log(value)
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }

}
