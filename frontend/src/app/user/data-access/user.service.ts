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

import { User } from '@shared/interfaces/user.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = '/api/user/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _user: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private _users: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);

  private _httpClient = inject(HttpClient);

  /**
   * Constructor
   */
  constructor() { }

  set user(value: User) {
    this._user.next(value);
  }

  /**
   * Getter for User
   */
  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  /**
   * Getter for Users
   */
  get users$(): Observable<User[] | null> {
    return this._users.asObservable();
  }

  /**
   * Get Users
   */
  getAll(id: string): Observable<User[]> {
    return this._httpClient
      .get<User[]>(this.baseUrl + 'all/?client_id=' + id, this.httpOptions)
      .pipe(
        tap((response) => {
          const users = response.sort((a, b) => a.id.localeCompare(b.id));
          this._users.next(users);
        })
      );
  }

  activate(id: string, key: string): Observable<{ success: boolean }> {
    return this._httpClient
      .get<{ "success": boolean }>(
        this.baseUrl + 'activate/?user_id=' + id + '&activation_key=' + key,
        this.httpOptions
      );
  }

  setUserPassword(password: string, user_id: string, activation_key: string): Observable<{ success: boolean }> {
    let data = {
      "password": password,
      "user_id": user_id,
      "activation_key": activation_key
    }
    return this._httpClient.post<{ success: boolean }>(
      this.baseUrl + 'set_password/', data, this.httpOptions
    );
  }

  /**
   * Search Users with given query
   *
   * @param query
   */
  // searchUsers(query: string): Observable<User[]> {
  //   return this._httpClient
  //     .get<User[]>('api/apps/Users/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Users) => {
  //         this._users.next(Users);
  //       })
  //     );
  // }

  /**
   * Get User by id
   */
  getUserById(id: string): Observable<User> {
    return this._users.pipe(
      take(1),
      map((users) => {
        // Find the User
        const user = users?.find((item) => item.id === id) || null;

        // Update the User
        this._user.next(user);

        // Return the User
        return user;
      }),
      switchMap((user) => {
        if (!user) {
          return throwError(
            () => 'Could not found User with id of ' + id + '!'
          );
        }

        return of(user);
      })
    );
  }

  /**
   * Create User
   */
  create(user: User): Observable<User[] | null> {
    return this.users$.pipe(
      take(1),
      switchMap((users) =>
        this._httpClient
          .post<User>(this.baseUrl + 'create/', user, this.httpOptions)
          .pipe(
            map((newUser) => {
              // const result = [{ ...newUser, ...users }];
              // this._users.next(result);
              // return result;
              users!.push(newUser);
              this._users.next(users);
              return users;
            })
          )
      )
    );
  }

  update(id: string, user: User): Observable<User[] | null> {
    return this.users$.pipe(
      take(1),
      switchMap((users) =>
        this._httpClient
          .put<User>(
            this.baseUrl + 'update/' + id + '/',
            user,
            this.httpOptions
          )
          .pipe(
            map((updatedUser) => {
              // const result = users.map((item) =>
              //   item.id === updatedUser.id? updatedUser : item
              // );
              // this._users.next(result);
              // return result;
              const index = users!.findIndex((item) => item.id === id);
              users![index] = updatedUser;
              this._users.next(users);
              return users;
            })
          )
      )
    );
  }

  delete(id: string): Observable<User[] | null> {
    return this.users$.pipe(
      take(1),
      switchMap((users) =>
        this._httpClient
          .delete<User>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
          .pipe(
            map((deletedUser) => {
              // const result = users.filter((item) => item.id!== id);
              // this._users.next(result);
              // return result;
              const index = users!.findIndex((item) => item.id === id);
              users!.splice(index, 1);
              this._users.next(users);
              return users;
            })
          )
      )
    );
  }
}
