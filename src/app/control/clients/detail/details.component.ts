import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { Client, ClientService } from 'src/app/control/clients/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-clients-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [Destroy]
})
export class DetailsComponent implements OnInit {
  clientId!: string;
  client$!: Observable<Client[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly destroy: Destroy
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((params: Params) => this.clientId = params['id']),
      switchMap((params: Params) => this.client$ = this.clientService.get(params['id'])),
      takeUntil(this.destroy)
    ).subscribe();
  }


}

