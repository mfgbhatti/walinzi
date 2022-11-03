import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil, switchMap, tap, Observable, map } from 'rxjs';

import { Destroy, Licence, SiaDetailService } from 'src/app/_shared';
import { Staff, StaffService } from '../shared';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [Destroy],
})
export class DetailComponent implements OnInit {
  staffId!: string;
  staff$!: Observable<Staff[]>;
  siaNumberError!: boolean;
  otherData: string[] | undefined;
  expiryStatus: string[] | undefined;
  newLicence!: Licence;

  constructor(
    private readonly destroy: Destroy,
    private readonly route: ActivatedRoute,
    private readonly staffService: StaffService,
    private readonly licenceService: SiaDetailService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((__param: Params) => (this.staffId = __param['id'])),
        switchMap(
          (__param: Params) =>
            (this.staff$ = this.staffService.get(__param['id']))
        ),
        takeUntil(this.destroy)
      )
      .subscribe();
    this.licenceService
      .getLicenceByStaffId(this.staffId)
      .pipe(
        map((data) => {
          if (data.length == 0) {
            this.siaNumberError = false;
            this.addLicenceDetails();
          } else {
            data.forEach((item) => {
              this.newLicence = item;
              if (item.error) {
                this.siaNumberError = true;
              }
            });
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  addLicenceDetails() {
    this.staff$
      .pipe(
        map((data) => {
          data.forEach((staff) => {
            this.licenceService
              .get(String(staff.sia_number))
              .pipe(
                tap((detail) => {
                  const parser = new DOMParser();
                  const result = parser
                    .parseFromString(detail, 'text/html')
                    .getElementsByClassName('panel-body');
                  if (result.length > 0) {
                    this.otherData =
                      result
                        ?.item(0)
                        ?.children?.item(1)
                        ?.textContent?.replace(/^\s+|\s+$/gm, '')
                        ?.toLocaleLowerCase()
                        ?.split('\n') ?? [];
                    this.expiryStatus =
                      result
                        ?.item(0)
                        ?.children?.item(2)
                        ?.textContent?.replace(/^\s+|\s+$/gm, '')
                        ?.toLocaleLowerCase()
                        ?.split('\n') ?? [];
                    let newDate = Timestamp.fromDate(
                      new Date(this.expiryStatus[1])
                    );
                    this.licenceService.add({
                      licence_no: this.otherData[1],
                      sector: this.otherData[5],
                      expired: newDate,
                      relative_id: this.staffId,
                      error: false,
                    });
                  } else {
                    this.licenceService.add({
                      error: true,
                      relative_id: this.staffId,
                    });
                  }
                })
              )
              .subscribe();
          });
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  editLicense() {

  }
}
