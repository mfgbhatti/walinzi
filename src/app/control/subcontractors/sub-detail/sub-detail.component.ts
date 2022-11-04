import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { Subcontractor, SubcontractorService } from 'src/app/control/subcontractors/shared';

@Component({
  selector: 'app-sub-detail',
  templateUrl: './sub-detail.component.html',
  styleUrls: ['./sub-detail.component.scss']
})
export class SubDetailComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  sub$: Subcontractor[] = [];
  subId!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly db: SubcontractorService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe (
      (__param) => this.subId = __param['id']
    );
    this.subscription = this.db.get(this.subId).subscribe (
      (list) => {
        this.sub$.push({...list} as Subcontractor);
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
