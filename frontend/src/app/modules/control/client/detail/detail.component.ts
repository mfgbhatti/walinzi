import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destroy } from '@walinzi/utils/destroy.util';
import { ClientService } from '../client.service';
import { Client } from '../client.types';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Destroy]
})
export class DetailComponent implements OnInit {
  editMode: boolean = false
  client!: Client | null
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _listComponent: ListComponent,
    private readonly _clientService: ClientService,
    private readonly _formBuilder: FormBuilder,
    private readonly _renderer2: Renderer2,
    private readonly _router: Router,
    private readonly _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

}
