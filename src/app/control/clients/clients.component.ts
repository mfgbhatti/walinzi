import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, tap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Client, ClientService } from 'src/app/control/clients/shared';
import { FormComponent } from 'src/app/control/clients';
import { Destroy } from '../../_shared';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [Destroy]
})
export class ClientsComponent implements OnInit {
  client$!: Observable<Client[]>;
  selected?: Client | undefined;
  isSelected: boolean = false;


  constructor(
    private readonly clientService: ClientService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {
  }

  ngOnInit(): void {
    this.client$ = this.clientService.getAll();
  }

  add() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {},
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((client) => this.clientService.create(client)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  update() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { ...this.selected },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((client) => this.clientService.update(client)),
        tap((client) => this.select(client)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  updateStatus(data: Client) {
    this.clientService.update(data);
  }

  select(data: Client) {
    this.isSelected = true;
    this.selected = data
  }

  deleteClient() {
    this.clientService.delete(this.selected!.id);
    this.selected = undefined;
  }

}
