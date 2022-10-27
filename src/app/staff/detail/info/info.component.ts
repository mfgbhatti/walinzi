import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AddressService,
  DocumentService,
  GetSiaDetailService,
  OriginService,
  PassportService,
  StaffAddress,
  StaffDocument,
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
  staffAddress$!: Observable<StaffAddress[]>;
  vetting$!: Observable<StaffVetting[]>;
  passport$!: Observable<StaffPassport[]>;
  extraDocument$!: Observable<StaffDocument[]>;

  @Input() stafdId!: string;

  constructor(
    private readonly addressService: AddressService,
    private readonly vettingService: VettingService,
    private readonly passportService: PassportService,
    private readonly documentService: DocumentService,
    private readonly sia: GetSiaDetailService
  ) {}

  ngOnInit(): void {
    this.staffAddress$ = this.addressService.getAll();
    this.vetting$ = this.vettingService.getAll();
    this.passport$ = this.passportService.getAll();
    this.extraDocument$ = this.documentService.getAll();
    this.sia.get('1013780138799882');
  }
  addDetail() {}

  editDetail() {}
  addVetting() {}
  editVetting(data: StaffVetting) {}

  addPassport() {}
  editPassport(data: StaffPassport) {}

  addDocument() {}
  editDocument(data: StaffDocument) {}
}
