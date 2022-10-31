import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService, StaffDocument } from 'src/app/staff/shared';

@Component({
  selector: 'app-extra-document',
  templateUrl: './extra-document.component.html',
  styleUrls: ['./extra-document.component.scss'],
})
export class ExtraDocumentComponent implements OnInit {
  @Input() staffId!: string;
  extraDocument$!: Observable<StaffDocument[]>;
  constructor(private readonly documentService: DocumentService) {}

  ngOnInit(): void {
    this.extraDocument$ = this.documentService.searchByStaffId(this.staffId);
  }

  addDetail() {}

  editDetail(data: StaffDocument) {}
}
