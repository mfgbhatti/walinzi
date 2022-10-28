import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AddressService, StaffAddress } from 'src/app/staff/shared';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  staffAddress$!: Observable<StaffAddress[]>;
  constructor(private readonly addressService: AddressService) {}

  ngOnInit(): void {
    this.staffAddress$ = this.addressService.getAll();
  }

  addDetail() {}
}
