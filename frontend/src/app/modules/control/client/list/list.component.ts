import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Destroy } from '@walinzi/utils/destroy.util';
import { Observable, takeUntil } from 'rxjs';
import { ClientService } from '../client.service';
import { Client } from '../client.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Destroy],
})
export class ListComponent implements OnInit {
  client$!: Observable<Client[] | null>;
  clientCount: number = 0;
  clientTableColumns: string[] = ['name', 'phone', 'email'];
  searchInputControl: FormControl = new FormControl();
  selectedClient!: Client | null;

  constructor(
    private readonly destroy: Destroy,
    private readonly _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.client$ = this._clientService.clients$;
    this._clientService.client$
      .pipe(takeUntil(this.destroy))
      .subscribe((client) => (this.selectedClient = client));
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
