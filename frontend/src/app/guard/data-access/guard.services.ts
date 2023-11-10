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
import { Guard } from '@shared/interfaces/guard.types';


@Injectable({ providedIn: 'root' })
export class GuardService {
  baseUrl = Enviroment.urls.guard;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _guard: BehaviorSubject<Guard | null> =
    new BehaviorSubject<Guard | null>(null);
  private _guards: BehaviorSubject<Guard[] | null> = new BehaviorSubject<
    Guard[] | null
  >(null);

  private _httpClient = inject(HttpClient)

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Getter for Guard
   */
  get guard$(): Observable<Guard | null> {
    return this._guard.asObservable();
  }

  /**
   * Getter for Guards
   */
  get guards$(): Observable<Guard[] | null> {
    return this._guards.asObservable();
  }

  /**
   * Get Guards
   */
  getAll(): Observable<Guard[]> {
    return this._httpClient
      .get<Guard[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((response) => {
          const guards = response.sort((a, b) => a.name.localeCompare(b.name));
          this._guards.next(guards);
        })
      );
  }

  /**
   * Search Guards with given query
   *
   * @param query
   */
  // searchGuards(query: string): Observable<Guard[]> {
  //   return this._httpClient
  //     .get<Guard[]>('api/apps/Guards/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Guards) => {
  //         this._guards.next(Guards);
  //       })
  //     );
  // }

  /**
   * Get Guard by id
   */
  getGuardById(id: string): Observable<Guard> {
    return this._guards.pipe(
      take(1),
      map((guards) => {
        // Find the Guard
        const guard = guards?.find((item) => item.id === id) || null;

        // Update the Guard
        this._guard.next(guard);

        // Return the Guard
        return guard;
      }),
      switchMap((guard) => {
        if (!guard) {
          return throwError(
            () => 'Could not found Guard with id of ' + id + '!'
          );
        }

        return of(guard);
      })
    );
  }

  /**
   * Create Guard
   */
  create(guard: Guard): Observable<Guard[] | null> {
    return this.guards$.pipe(
      take(1),
      switchMap((guards) =>
        this._httpClient
          .post<Guard>(this.baseUrl + 'create/', guard, this.httpOptions)
          .pipe(
            map((newGuard) => {
              // const result = [{ ...newGuard, ...guards }];
              // this._guards.next(result);
              // return result;
              guards!.push(newGuard);
              this._guards.next(guards);
              return guards;
            })
          )
      )
    );
  }

  update(id: string, guard: Guard): Observable<Guard[] | null> {
    return this.guards$.pipe(
      take(1),
      switchMap((guards) =>
        this._httpClient
         .put<Guard>(this.baseUrl + 'update/' + id + '/', guard, this.httpOptions)
         .pipe(
            map((updatedGuard) => {
              // const result = guards.map((item) =>
              //   item.id === updatedGuard.id? updatedGuard : item
              // );
              // this._guards.next(result);
              // return result;
              const index = guards!.findIndex((item) => item.id === id);
              guards![index] = updatedGuard;
              this._guards.next(guards);
              return guards;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Guard[] | null> {
    return this.guards$.pipe(
      take(1),
      switchMap((guards) =>
        this._httpClient
         .delete<Guard>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
         .pipe(
            map((deletedGuard) => {
              // const result = guards.filter((item) => item.id!== id);
              // this._guards.next(result);
              // return result;
              const index = guards!.findIndex((item) => item.id === id);
              guards!.splice(index, 1);
              this._guards.next(guards);
              return guards;
            })
          )
      )
    );
  }
}
