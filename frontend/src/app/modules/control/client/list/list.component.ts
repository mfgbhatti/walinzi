import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
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
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _clientService: ClientService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.client$ = this._clientService.clients$;
    this._clientService.clients$
      .pipe(takeUntil(this.destroy))
      .subscribe((clients) => {
        if (clients) {
          this.clientCount = clients.length;
        }
        this._changeDetectorRef.markForCheck();
      });
    this._clientService.client$
      .pipe(takeUntil(this.destroy))
      .subscribe((client) => (this.selectedClient = client));
  }

  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }

  createContact(): void {
    this._clientService.create().subscribe((newContact) => {
      this._router.navigate(['./', newContact.id], {
        relativeTo: this._activatedRoute,
      });
      this._changeDetectorRef.markForCheck();
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
