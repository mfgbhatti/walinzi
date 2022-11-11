import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { Destroy } from '../../destroy.class';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ExtraDetailService } from './extra-detail.service';
import { ExtraDetail } from './extra-detail.types';

@Component({
  selector: 'app-extra-detail',
  templateUrl: './extra-detail.component.html',
  styleUrls: ['./extra-detail.component.scss'],
  providers: [Destroy]
})
export class ExtraDetailComponent implements OnInit {

  contactPersonPath: string = 'ContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';
  detail$!: Observable<ExtraDetail[]>;
  selected!: ExtraDetail;
  @Input() relativeId!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly detailService: ExtraDetailService,
    private readonly destroy: Destroy
  ) { }

  ngOnInit(): void {
    this.detail$ = this.detailService.get(this.relativeId);
  }

  add() {
    const dialogRef = this.dialog.open(DetailFormComponent, {
      data: { relative_id: this.relativeId },
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.detailService.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  edit(data: ExtraDetail) {
    const dialogRef = this.dialog.open(DetailFormComponent, {
      data: {...data},
      width: '40%',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.detailService.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }


  delete(id: string) {
    this.detailService.delete(id);
  }
}
