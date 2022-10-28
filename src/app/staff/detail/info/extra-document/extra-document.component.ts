import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService, StaffDocument } from 'src/app/staff/shared';

@Component({
  selector: 'app-extra-document',
  templateUrl: './extra-document.component.html',
  styleUrls: ['./extra-document.component.scss']
})
export class ExtraDocumentComponent implements OnInit {
  extraDocument$!: Observable<StaffDocument[]>;
  constructor(
    private readonly documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.extraDocument$ = this.documentService.getAll();
  }

  addDetail() {}

  editDetail(data: StaffDocument) {}

}
