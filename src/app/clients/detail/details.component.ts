import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { Client, ClientService } from 'src/app/clients/shared';
import { Destroy } from 'src/app/_shared';

@Component({
  selector: 'app-clients-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
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
    // ).subscribe( (data) => this.client$ = data as obser);
    // this.subscription = this.route.params.subscribe(
    //   (__param) => {
    //     this.clientId = __param['id']
    //   }
    // );
    // this.subscription = this.clientService.get(this.clientId).subscribe(
    //   data => {
    //     // const item = Object.keys(list).map(key => ({type: key, value: list[key]}));
    //     this.client$.push({ ...data } as Client);
    //   });
  }


}

