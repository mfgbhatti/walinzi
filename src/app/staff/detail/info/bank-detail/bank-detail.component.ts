import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BankDetailService, StaffBankDetail } from 'src/app/staff/shared';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss'],
})
export class BankDetailComponent implements OnInit {
  bankDetail$!: Observable<StaffBankDetail[]>;

  constructor(
    private readonly bankService: BankDetailService
  ) {}

  ngOnInit(): void {
    this.bankDetail$ = this.bankService.getAll();
  }

  addDetail() {}
  editDetail(data: StaffBankDetail) {}
}
