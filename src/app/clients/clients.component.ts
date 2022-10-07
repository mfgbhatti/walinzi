import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Clients, ClientsService } from 'src/app/clients/shared';
import { FormComponent } from 'src/app/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  allClient$!: Observable<Clients[]>;
  selectedClient?: Clients;
  destroyed$ = new Subject<void>();
  isSelected: boolean = false;


  constructor(
    private readonly clientsService: ClientsService,
    private readonly dialog: MatDialog
  ) { 
    this.allClient$ = this.clientsService.getAll();
  }

  ngOnInit(): void {
  }

  addClient() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {},
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((client) => this.clientsService.create(client)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateClient() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { ...this.selectedClient },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((client) => this.clientsService.update(client)),
        tap((client) => this.selectClient(client)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  updateStatus(client: Clients) {
    this.clientsService.update(client);
  }
  selectClient(client: Clients) {
    this.isSelected = true;
    this.selectedClient = client
  }

  deleteClient () {
    this.clientsService.delete(this.selectedClient!.id);
    this.selectedClient = undefined;
  }

  ngOnDestroy() {
    this.destroyed$
    .next()
  }
}
