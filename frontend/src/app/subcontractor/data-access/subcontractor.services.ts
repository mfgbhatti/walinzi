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

import { Subcontractor } from '@shared/interfaces/subcontractor.types';
import { Enviroment } from 'src/enviroments';

@Injectable({ providedIn: 'root' })
export class SubcontractorService {
  private _latestData!: boolean;
  baseUrl = Enviroment.urls.subcontractor;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _subcontractor: BehaviorSubject<Subcontractor | null> =
    new BehaviorSubject<Subcontractor | null>(null);
  private _subcontractors: BehaviorSubject<Subcontractor[]> =
    new BehaviorSubject<Subcontractor[]>([]);

  private _httpClient = inject(HttpClient);

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Getter for Subcontractor
   */
  get subcontractor$(): Observable<Subcontractor | null> {
    return this._subcontractor.asObservable();
  }

  /**
   * Getter for Subcontractors
   */
  get subcontractors$(): Observable<Subcontractor[]> {
    if (!this._latestData) {
      return this.getAll();
    }
    return this._subcontractors.asObservable();
  }

  /**
   * Get Subcontractors
   */
  getAll(): Observable<Subcontractor[]> {
    return this._httpClient
      .get<Subcontractor[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((response) => {
          const subcontractors = response.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this._subcontractors.next(subcontractors);
          // we received latest data
          this._latestData = true;
        })
      );
  }

  /**
   * Search Subcontractors with given query
   *
   * @param query
   */
  // searchSubcontractors(query: string): Observable<Subcontractor[]> {
  //   return this._httpClient
  //     .get<Subcontractor[]>('api/apps/Subcontractors/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Subcontractors) => {
  //         this._subcontractors.next(Subcontractors);
  //       })
  //     );
  // }

  /**
   * Get Subcontractor by id
   */
  getSubcontractorById(id: string): Observable<Subcontractor> {
    return this._subcontractors.pipe(
      take(1),
      map((subcontractors) => {
        // Find the Subcontractor
        const subcontractor =
          subcontractors?.find((item) => item.id === id) || null;

        // Update the Subcontractor
        this._subcontractor.next(subcontractor);

        // Return the Subcontractor
        return subcontractor;
      }),
      switchMap((subcontractor) => {
        if (!subcontractor) {
          return throwError(
            () => 'Could not found Subcontractor with id of ' + id + '!'
          );
        }

        return of(subcontractor);
      })
    );
  }

  /**
   * Create Subcontractor
   */
  create(subcontractor: Subcontractor): Observable<Subcontractor[] | null> {
    return this.subcontractors$.pipe(
      take(1),
      switchMap((subcontractors) =>
        this._httpClient
          .post<Subcontractor>(
            this.baseUrl + 'create/',
            subcontractor,
            this.httpOptions
          )
          .pipe(
            map((newSubcontractor) => {
              // const result = [{ ...newSubcontractor, ...subcontractors }];
              // this._subcontractors.next(result);
              // return result;
              subcontractors!.push(newSubcontractor);
              this._subcontractors.next(subcontractors);
              return subcontractors;
            })
          )
      )
    );
  }

  update(
    id: string,
    subcontractor: Subcontractor
  ): Observable<Subcontractor[] | null> {
    return this.subcontractors$.pipe(
      take(1),
      switchMap((subcontractors) =>
        this._httpClient
          .put<Subcontractor>(
            this.baseUrl + 'update/' + id + '/',
            subcontractor,
            this.httpOptions
          )
          .pipe(
            map((updatedSubcontractor) => {
              // const result = subcontractors.map((item) =>
              //   item.id === updatedSubcontractor.id? updatedSubcontractor : item
              // );
              // this._subcontractors.next(result);
              // return result;
              const index = subcontractors!.findIndex((item) => item.id === id);
              subcontractors![index] = updatedSubcontractor;
              this._subcontractors.next(subcontractors);
              return subcontractors;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Subcontractor[] | null> {
    return this.subcontractors$.pipe(
      take(1),
      switchMap((subcontractors) =>
        this._httpClient
          .delete<Subcontractor>(
            this.baseUrl + 'delete/' + id + '/',
            this.httpOptions
          )
          .pipe(
            map((deletedSubcontractor) => {
              // const result = subcontractors.filter((item) => item.id!== id);
              // this._subcontractors.next(result);
              // return result;
              const index = subcontractors!.findIndex((item) => item.id === id);
              subcontractors!.splice(index, 1);
              this._subcontractors.next(subcontractors);
              return subcontractors;
            })
          )
      )
    );
  }
}
