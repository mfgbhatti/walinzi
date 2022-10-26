import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AddressService,
  DocumentService,
  OriginService,
  PassportService,
  StaffAddress,
  StaffDocument,
  StaffOrigin,
  StaffPassport,
  StaffVetting,
  VettingService,
} from '../../shared';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  staffOrigin$!: Observable<StaffOrigin[]>;
  staffAddress$!: Observable<StaffAddress[]>;
  vetting$!: Observable<StaffVetting[]>;
  passport$!: Observable<StaffPassport[]>;
  extraDocument$!: Observable<StaffDocument[]>;

  @Input() stafdId!: string;

  constructor(
    private readonly originService: OriginService,
    private readonly addressService: AddressService,
    private readonly vettingService: VettingService,
    private readonly passportService: PassportService,
    private readonly documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.staffOrigin$ = this.originService.getAll();
    this.staffAddress$ = this.addressService.getAll();
    this.vetting$ = this.vettingService.getAll();
    this.passport$ = this.passportService.getAll();
    this.extraDocument$ = this.documentService.getAll();
  }

  addDetail() {}

  editDetail(data: StaffOrigin) {}

  addVetting() {}
  editVetting(data: StaffVetting) {}

  addPassport() {}
  editPassport(data: StaffPassport) {}

  addDocument() {}
  editDocument( data: StaffDocument) {}
}
