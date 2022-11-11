import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { takeUntil, tap } from 'rxjs';

import { Destroy } from '../shared/destroy.class';
import { SiaDetailService } from 'src/app/core/sia/sia-detail.service'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-sia-search',
  templateUrl: './sia-search.component.html',
  styleUrls: ['./sia-search.component.scss'],
  providers: [Destroy],
})
export class SiaSearchComponent implements OnInit{
  names: string[] | undefined;
  otherData: string[] | undefined;
  expiryStatus: string[] | undefined;
  explaination: string[] | undefined;
  empty!: boolean;

  constructor(
    private readonly siadetail: SiaDetailService,
    private readonly destroy: Destroy
  ) {}

  ngOnInit(): void {
    this.empty = false;
  }

  sia_number = new FormControl('', [
    Validators.required,
    Validators.minLength(16),
    Validators.maxLength(16),
    Validators.pattern('^[0-9]{16}$'),
  ]);

  matcher = new MyErrorStateMatcher();

  submit() {
    this.siadetail
      .get(this.sia_number.value as string)
      .pipe(
        tap((data) => {
          const parser = new DOMParser();
          const result = parser
            .parseFromString(data, 'text/html')
            .getElementsByClassName('panel-body');
          if (result.length > 0) {
            this.names = result
              ?.item(0)
              ?.children.item(0)
              ?.textContent?.replace(/^\s+|\s+$/gm, '')
              ?.toLocaleLowerCase()
              ?.split('\n');
            this.otherData = result
              ?.item(0)
              ?.children?.item(1)
              ?.textContent?.replace(/^\s+|\s+$/gm, '')
              ?.toLocaleLowerCase()
              ?.split('\n') ?? [];
            this.expiryStatus = result
              ?.item(0)
              ?.children?.item(2)
              ?.textContent?.replace(/^\s+|\s+$/gm, '')
              ?.toLocaleLowerCase()
              ?.split('\n');
            this.explaination = result
              ?.item(0)
              ?.children?.item(3)
              ?.textContent?.replace(/^\s+|\s+$/gm, '')
              ?.replace(/\s-/g,'')
              ?.toLocaleLowerCase()
              ?.split('\n');
          } else {
            this.empty = true;
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
