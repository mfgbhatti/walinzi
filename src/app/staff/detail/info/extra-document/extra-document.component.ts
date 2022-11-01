import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { DocumentService, StaffDocument } from 'src/app/staff/shared';
import { Destroy } from 'src/app/_shared';
import { DocumentFormComponent } from '../../shared';

@Component({
  selector: 'app-extra-document',
  templateUrl: './extra-document.component.html',
  styleUrls: ['./extra-document.component.scss'],
  providers: [Destroy]
})
export class ExtraDocumentComponent implements OnInit {
  document$!: Observable<StaffDocument[]>;
  @Input() staffId!: string;

  constructor(
    private readonly documentService: DocumentService,
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.document$ = this.documentService.searchByStaffId(this.staffId);
  }

  addDetail() {
    const dialogRef = this.dialog.open(DocumentFormComponent, {
      data: { relative_id: this.staffId },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.documentService.create(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editDetail(data: StaffDocument) {
    const dialogRef = this.dialog.open(DocumentFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.documentService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
