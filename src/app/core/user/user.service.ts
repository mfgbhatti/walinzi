import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _users: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/users/get/').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
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

    getUsers(userId: string): Observable<User[]> {
        return this._httpClient
            .get<User[]>('api/users/get-list/' + userId + '/')
            .pipe(
                tap((users) => {
                    this._users.next(users);
                })
            );
    }
}
