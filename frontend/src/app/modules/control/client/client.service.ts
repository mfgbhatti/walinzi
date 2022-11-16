import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from './client.types';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = '/api/clients/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0',
    }),
    responseType: 'json' as const,
  };

  private _clients: BehaviorSubject<Client[] | null> = new BehaviorSubject<
    Client[] | null
  >(null);
  private _client: BehaviorSubject<Client | null> =
    new BehaviorSubject<Client | null>(null);

  constructor(private _httpClient: HttpClient) {}

  get client$(): Observable<Client | null> {
    return this._client.asObservable();
  }

  get clients$(): Observable<Client[] | null> {
    return this._clients.asObservable();
  }

  getAll(): Observable<Client[]> {
    return this._httpClient
      .get<Client[]>(this.baseUrl + 'all', this.httpOptions)
      .pipe(
        tap((response) => {
          const clients = response.sort((a, b) => a.name.localeCompare(b.name))
          this._clients.next(clients);
        })
      );
  }
  getClientById(id: string): Observable<Client | null> {
    return this._clients.pipe(
      take(1),
      map((clients) => {
        const client = clients?.find((item) => item.id === id || null);
        if (client) {
          this._client.next(client);
        }
        return client || null;
      }),
      switchMap((client) => {
        if (!client) {
          throwError('Could not found contact with id of' + id + '!');
        }
        return of(client);
      })
    );
  }
  // search(query: string): Observable<Client[]> {

  // }
  create(data: Client) {}
  update(data: Client) {}
  delete(id: string) {}
}
