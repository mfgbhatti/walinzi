import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OriginService, StaffOrigin } from 'src/app/staff/shared';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
})
export class OriginComponent implements OnInit {
  staffOrigin$!: Observable<StaffOrigin[]>;

  constructor(private readonly originService: OriginService) {}

  ngOnInit(): void {
    this.staffOrigin$ = this.originService.getAll();
  }
  addDetail() {}

  editDetail(data: StaffOrigin) {}
}
