import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Clients, ClientsService } from 'src/app/clients/shared';

@Component({
  selector: 'app-clients-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  clientId!: string;
  client: Clients[] = [];
  // client!:{}
  // client!: Observable<DocumentData>;
  subscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientService: ClientsService
  ) {
  }

  ngOnInit(): void { 
    this.subscription = this.route.params.subscribe(
      (__param) => {
        this.clientId = __param['id']
      }
    );
    this.subscription = this.clientService.get(this.clientId).subscribe(
      data => {
        // const item = Object.keys(list).map(key => ({type: key, value: list[key]}));
        this.client.push({...data} as Clients);
      });

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
