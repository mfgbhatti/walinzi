import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'any',
})
export class Destroy extends Observable<void> implements OnDestroy {
  private readonly destroySubject$ = new ReplaySubject<void>(1);
  private readonly _overlayRef$!: OverlayRef;

  constructor() {
    super((subscriber) => this.destroySubject$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    if (this._overlayRef$) {
      this._overlayRef$.dispose();
    }
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
