import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, tap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Client, ClientService } from 'src/app/clients/shared';
import { FormComponent } from 'src/app/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  client$!: Observable<Client[]>;
  selected?: Client | undefined;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;


  constructor(
    private readonly clientService: ClientService,
    private readonly dialog: MatDialog
  ) { 
    this.client$ = this.clientService.getAll();
  }

  ngOnInit(): void {
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
        takeUntil(this.destroyed$)
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
        takeUntil(this.destroyed$)
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

  deleteClient () {
    this.clientService.delete(this.selected!.id);
    this.selected = undefined;
  }

  ngOnDestroy() {
    this.destroyed$.next()
  }
}
