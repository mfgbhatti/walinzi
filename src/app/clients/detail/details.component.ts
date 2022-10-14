import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Client, ClientService } from 'src/app/clients/shared';

@Component({
  selector: 'app-clients-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  clientId!: string;
  client$: Client[] = [];
  subscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientService: ClientService
  ) {  }

  ngOnInit(): void { 
    this.subscription = this.route.params.subscribe(
      (__param) => {
        this.clientId = __param['id']
      }
    );
    this.subscription = this.clientService.get(this.clientId).subscribe(
      data => {
        // const item = Object.keys(list).map(key => ({type: key, value: list[key]}));
        this.client$.push({...data} as Client);
      });

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
