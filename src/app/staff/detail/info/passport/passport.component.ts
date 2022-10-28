import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PassportService, StaffPassport } from 'src/app/staff/shared';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
  passport$!: Observable<StaffPassport[]>;
  constructor(
    private readonly passportService: PassportService,
  ) { }

  ngOnInit(): void {
    this.passport$ = this.passportService.getAll();
  }

  addDetail() {}
  editDetail(data: StaffPassport) {}

}
