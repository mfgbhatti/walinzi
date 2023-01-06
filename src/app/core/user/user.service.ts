import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

export type NewUser = Omit<User, 'id'>;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private _users: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  _members: User[] = [];

  constructor(private _httpClient: HttpClient) { }

  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  get(): Observable<User> {
    return this._httpClient.get<User>('api/users/get/').pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  update(user: User): Observable<any> {
    return this._httpClient
      .put<User>('api/users/update/' + user.id + '/', {
        title: user.title,
        name: user.name,
        about: user.about,
        phone: user.phone,
      })
      .pipe(
        map((response) => {
          this._user.next(response);
        })
      );
  }

  create(user: NewUser): Observable<any> {
    return this._httpClient.post<User>('api/users/create/', user).pipe(
      map((response) => {
          this._users.next([...this._members, response]);
      })
    );
  }

  getUsers(customerId: string): Observable<User[]> {
    return this._httpClient
      .get<User[]>('api/users/get-list/' + customerId + '/')
      .pipe(
        tap((users) => {
          this._members = users;
          this._users.next(users);
        })
      );
  }
}
