import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ClientsService } from 'src/app/_services';
import { Clients } from 'src/app/_modals';
import { ClientFormComponent } from 'src/app/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  allClient$!: Observable<Clients[]>;
  selectedClient?: Clients;
  destroyed$ = new Subject<void>();


  constructor(
    private readonly clientsService: ClientsService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.allClient$ = this.clientsService.getAll();
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: {},
      width: '40%',
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
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: { ...this.selectedClient },
      width: '40%',
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

  selectClient(client: Clients) {
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
