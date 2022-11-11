import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { Destroy } from 'src/app/shared/destroy.class';

import { ContactPersonFormComponent } from './contact-person-form/contact-person-form.component';
import { ContactPersonService } from './contact-person.service';
import { ContactPerson } from './contact-person.types';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.scss']
})
export class ContactPersonComponent {
  contact$!: Observable<ContactPerson[]>;
  @Input() relativeId!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly destroy: Destroy,
    private readonly cps: ContactPersonService,
  ) { }

  add() {
    const dialogRef = this.dialog.open(ContactPersonFormComponent, {
      data: { relative_id: this.relativeId },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.cps.add(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
  edit(data: ContactPerson) {
    const dialogRef = this.dialog.open(ContactPersonFormComponent, {
      data: { ...data },
      width: '40%',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.cps.update(data)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  delete(id: string) {
    this.cps.delete(id);
  }


}
