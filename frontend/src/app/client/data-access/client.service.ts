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

import { Client } from '@shared/interfaces/client.types';

@Injectable({ providedIn: 'root' })
export class ClientService {
  baseUrl = '/api/client/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _client: BehaviorSubject<Client | null> =
    new BehaviorSubject<Client | null>(null);
  private _clients: BehaviorSubject<Client[] | null> = new BehaviorSubject<
    Client[] | null
  >(null);

  private _httpClient = inject(HttpClient)

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Getter for Client
   */
  get client$(): Observable<Client | null> {
    return this._client.asObservable();
  }

  /**
   * Getter for Clients
   */
  get clients$(): Observable<Client[] | null> {
    return this._clients.asObservable();
  }

  /**
   * Get Clients
   */
  getAll(): Observable<Client[]> {
    return this._httpClient
      .get<Client[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((response) => {
          const clients = response.sort((a, b) => a.name.localeCompare(b.name));
          this._clients.next(clients);
        })
      );
  }

  /**
   * Search Clients with given query
   *
   * @param query
   */
  // searchClients(query: string): Observable<Client[]> {
  //   return this._httpClient
  //     .get<Client[]>('api/apps/Clients/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Clients) => {
  //         this._clients.next(Clients);
  //       })
  //     );
  // }

  /**
   * Get Client by id
   */
  getClientById(id: string): Observable<Client> {
    return this._clients.pipe(
      take(1),
      map((clients) => {
        // Find the Client
        const client = clients?.find((item) => item.id === id) || null;

        // Update the Client
        this._client.next(client);

        // Return the Client
        return client;
      }),
      switchMap((client) => {
        if (!client) {
          return throwError(
            () => 'Could not found Client with id of ' + id + '!'
          );
        }

        return of(client);
      })
    );
  }

  /**
   * Create Client
   */
  create(client: Client): Observable<Client[] | null> {
    return this.clients$.pipe(
      take(1),
      switchMap((clients) =>
        this._httpClient
          .post<Client>(this.baseUrl + 'create/', client, this.httpOptions)
          .pipe(
            map((newClient) => {
              // const result = [{ ...newClient, ...clients }];
              // this._clients.next(result);
              // return result;
              clients!.push(newClient);
              this._clients.next(clients);
              return clients;
            })
          )
      )
    );
  }

  update(id: string, client: Client): Observable<Client[] | null> {
    return this.clients$.pipe(
      take(1),
      switchMap((clients) =>
        this._httpClient
         .put<Client>(this.baseUrl + 'update/' + id + '/', client, this.httpOptions)
         .pipe(
            map((updatedClient) => {
              // const result = clients.map((item) =>
              //   item.id === updatedClient.id? updatedClient : item
              // );
              // this._clients.next(result);
              // return result;
              const index = clients!.findIndex((item) => item.id === id);
              clients![index] = updatedClient;
              this._clients.next(clients);
              return clients;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Client[] | null> {
    return this.clients$.pipe(
      take(1),
      switchMap((clients) =>
        this._httpClient
         .delete<Client>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
         .pipe(
            map((deletedClient) => {
              // const result = clients.filter((item) => item.id!== id);
              // this._clients.next(result);
              // return result;
              const index = clients!.findIndex((item) => item.id === id);
              clients!.splice(index, 1);
              this._clients.next(clients);
              return clients;
            })
          )
      )
    );
  }
}
