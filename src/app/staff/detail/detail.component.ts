import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil, switchMap, tap, Observable } from 'rxjs';

import { Destroy } from 'src/app/_shared';
import { Staff, StaffService } from '../shared';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [Destroy],
})
export class DetailComponent implements OnInit {
  staffId!: string;
  staff$!: Observable<Staff[]>;
  constructor(
    private readonly destroy: Destroy,
    private readonly route: ActivatedRoute,
    private readonly staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((__param: Params) => (this.staffId = __param['id'])),
        switchMap(
          (__param: Params) =>
            (this.staff$ = this.staffService.get(__param['id']))
        ),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
