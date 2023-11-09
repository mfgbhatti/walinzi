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

import { Location } from '@shared/interfaces/location.types';
import { Enviroment } from 'src/enviroments';


@Injectable({ providedIn: 'root' })
export class LocationService {
  baseUrl = Enviroment.urls.location;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _location: BehaviorSubject<Location | null> =
    new BehaviorSubject<Location | null>(null);
  private _locations: BehaviorSubject<Location[] | null> = new BehaviorSubject<
    Location[] | null
  >(null);

  private _httpClient = inject(HttpClient)

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Getter for Location
   */
  get location$(): Observable<Location | null> {
    return this._location.asObservable();
  }

  /**
   * Getter for Locations
   */
  get locations$(): Observable<Location[] | null> {
    return this._locations.asObservable();
  }

  /**
   * Get Locations
   */
  getAll(): Observable<Location[]> {
    return this._httpClient
      .get<Location[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((response) => {
          const locations = response.sort((a, b) => a.name.localeCompare(b.name));
          this._locations.next(locations);
        })
      );
  }

  /**
   * Search Locations with given query
   *
   * @param query
   */
  // searchLocations(query: string): Observable<Location[]> {
  //   return this._httpClient
  //     .get<Location[]>('api/apps/Locations/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Locations) => {
  //         this._locations.next(Locations);
  //       })
  //     );
  // }

  /**
   * Get Location by id
   */
  getLocationById(id: string): Observable<Location> {
    return this._locations.pipe(
      take(1),
      map((locations) => {
        // Find the Location
        const location = locations?.find((item) => item.id === id) || null;

        // Update the Location
        this._location.next(location);

        // Return the Location
        return location;
      }),
      switchMap((location) => {
        if (!location) {
          return throwError(
            () => 'Could not found Location with id of ' + id + '!'
          );
        }

        return of(location);
      })
    );
  }

  /**
   * Create Location
   */
  create(location: Location): Observable<Location[] | null> {
    return this.locations$.pipe(
      take(1),
      switchMap((locations) =>
        this._httpClient
          .post<Location>(this.baseUrl + 'create/', location, this.httpOptions)
          .pipe(
            map((newLocation) => {
              // const result = [{ ...newLocation, ...locations }];
              // this._locations.next(result);
              // return result;
              locations!.push(newLocation);
              this._locations.next(locations);
              return locations;
            })
          )
      )
    );
  }

  update(id: string, location: Location): Observable<Location[] | null> {
    return this.locations$.pipe(
      take(1),
      switchMap((locations) =>
        this._httpClient
         .put<Location>(this.baseUrl + 'update/' + id + '/', location, this.httpOptions)
         .pipe(
            map((updatedLocation) => {
              // const result = locations.map((item) =>
              //   item.id === updatedLocation.id? updatedLocation : item
              // );
              // this._locations.next(result);
              // return result;
              const index = locations!.findIndex((item) => item.id === id);
              locations![index] = updatedLocation;
              this._locations.next(locations);
              return locations;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Location[] | null> {
    return this.locations$.pipe(
      take(1),
      switchMap((locations) =>
        this._httpClient
         .delete<Location>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
         .pipe(
            map((deletedLocation) => {
              // const result = locations.filter((item) => item.id!== id);
              // this._locations.next(result);
              // return result;
              const index = locations!.findIndex((item) => item.id === id);
              locations!.splice(index, 1);
              this._locations.next(locations);
              return locations;
            })
          )
      )
    );
  }
}
