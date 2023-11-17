import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';

import { Enviroment } from 'src/enviroments';
import { Shift } from '@shared/interfaces/shift.types';

@Injectable({ providedIn: 'root' })
export class ShiftService {
  private _latestData!: boolean;
  baseUrl = Enviroment.urls.shift;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _shift: BehaviorSubject<Shift | null> =
    new BehaviorSubject<Shift | null>(null);
  private _shifts: BehaviorSubject<Shift[]> = new BehaviorSubject<Shift[]>([]);

  private _httpClient = inject(HttpClient);

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Getter for Shift
   */
  get shift$(): Observable<Shift | null> {
    return this._shift.asObservable();
  }

  /**
   * Getter for Shifts
   */
  get shifts$(): Observable<Shift[]> {
    if (!this._latestData) {
      return this.getAll();
    }
    return this._shifts.asObservable();
  }

  /**
   * Get Shifts
   */
  getAll(): Observable<Shift[]> {
    return this._httpClient
      .get<Shift[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((shifts) => {
          // const shifts = response.sort((a, b) => a.name.localeCompare(b.name));
          this._shifts.next(shifts);
          // we received latest data
          this._latestData = true;
        })
      );
  }

  /**
   * Search Shifts with given query
   *
   * @param query
   */
  // searchShifts(query: string): Observable<Shift[]> {
  //   return this._httpClient
  //     .get<Shift[]>('api/apps/Shifts/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Shifts) => {
  //         this._shifts.next(Shifts);
  //       })
  //     );
  // }

  /**
   * Get Shift by id
   */
  getShiftById(id: string): Observable<Shift> {
    return this._shifts.pipe(
      take(1),
      map((shifts) => {
        // Find the Shift
        const shift = shifts?.find((item) => item.id === id) || null;

        // Update the Shift
        this._shift.next(shift);

        // Return the Shift
        return shift;
      }),
      switchMap((shift) => {
        if (!shift) {
          return throwError(
            () => 'Could not found Shift with id of ' + id + '!'
          );
        }

        return of(shift);
      })
    );
  }

  /**
   * Create Shift
   */
  create(shift: Shift): Observable<Shift[] | null> {
    return this.shifts$.pipe(
      take(1),
      switchMap((shifts) =>
        this._httpClient
          .post<Shift>(this.baseUrl + 'create/', shift, this.httpOptions)
          .pipe(
            map((newShift) => {
              // const result = [{ ...newShift, ...shifts }];
              // this._shifts.next(result);
              // return result;
              shifts!.push(newShift);
              this._shifts.next(shifts);
              return shifts;
            })
          )
      )
    );
  }

  update(id: string, shift: Shift): Observable<Shift[] | null> {
    return this.shifts$.pipe(
      take(1),
      switchMap((shifts) =>
        this._httpClient
          .put<Shift>(
            this.baseUrl + 'update/' + id + '/',
            shift,
            this.httpOptions
          )
          .pipe(
            map((updatedShift) => {
              // const result = shifts.map((item) =>
              //   item.id === updatedShift.id? updatedShift : item
              // );
              // this._shifts.next(result);
              // return result;
              const index = shifts!.findIndex((item) => item.id === id);
              shifts![index] = updatedShift;
              this._shifts.next(shifts);
              return shifts;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Shift[] | null> {
    return this.shifts$.pipe(
      take(1),
      switchMap((shifts) =>
        this._httpClient
          .delete<Shift>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
          .pipe(
            map((deletedShift) => {
              // const result = shifts.filter((item) => item.id!== id);
              // this._shifts.next(result);
              // return result;
              const index = shifts!.findIndex((item) => item.id === id);
              shifts!.splice(index, 1);
              this._shifts.next(shifts);
              return shifts;
            })
          )
      )
    );
  }
}
