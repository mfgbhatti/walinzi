import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffVetting, VettingService } from 'src/app/staff/shared';

@Component({
  selector: 'app-info-vetting',
  templateUrl: './vetting.component.html',
  styleUrls: ['./vetting.component.scss'],
})
export class VettingInfoComponent implements OnInit {
  vetting$!: Observable<StaffVetting[]>;
  constructor(private readonly vettingService: VettingService) {}

  ngOnInit(): void {
    this.vetting$ = this.vettingService.getAll();
  }
  addDetail() {}
  editVetting(data: StaffVetting) {}
}
