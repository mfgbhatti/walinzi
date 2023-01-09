import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Contact as DataType } from '@modules/admin/clients/clients.types';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  itemName = 'Client';
  // url: string = 'api/clients';
  url: string = 'api/apps/contacts';
  // Private
  private readonly _item: BehaviorSubject<DataType | null> =
    new BehaviorSubject(null);
  private readonly _items: BehaviorSubject<DataType[] | null> =
    new BehaviorSubject(null);

  constructor(private readonly _httpClient: HttpClient) { }

  // Signleton
  get item$(): Observable<DataType> {
    return this._item.asObservable();
  }

  // all items
  get items$(): Observable<DataType[]> {
    return this._items.asObservable();
  }

  getitems(): Observable<DataType[]> {
    return this._httpClient.get<DataType[]>(this.url + '/all/').pipe(
      tap((items) => {
        this._items.next(items);
      })
    );
  }

  // search items
  searchItems(query: string): Observable<DataType[]> {
    return this._httpClient
      .get<DataType[]>(this.url + '/search/', {
        params: { query },
      })
      .pipe(
        tap((items) => {
          this._items.next(items);
        })
      );
  }

  getItemById(id: string): Observable<DataType> {
    return this._items.pipe(
      take(1),
      map((items) => {
        // Find the on item by id
        const item = items.find((item) => item.id === id) || null;

        // Update the item
        this._item.next(item);

        // Return the item
        return item;
      }),
      switchMap((item) => {
        if (!item) {
          return throwError(
            'Could not found ' +
            this.itemName +
            ' with id of ' +
            id +
            '!'
          );
        }

        return of(item);
      })
    );
  }

  createNewItem(): Observable<DataType> {
    return this.items$.pipe(
      take(1),
      switchMap((items) =>
        this._httpClient.post<DataType>(this.url + '/create/', {}).pipe(
          map((newItem) => {
            // Update the contacts with the new contact
            this._items.next([newItem, ...items]);

            // Return the new contact
            return newItem;
          })
        )
      )
    );
  }

  updateItem(id: string, contact: DataType): Observable<DataType> {
    return this.items$.pipe(
      take(1),
      switchMap((items) =>
        this._httpClient
          .patch<DataType>(this.url + '/update/', {
            id,
            contact,
          })
          .pipe(
            map((updateditem) => {
              // Find the index of the updated contact
              const index = items.findIndex(
                (item) => item.id === id
              );

              // Update the contact
              items[index] = updateditem;

              // Update the contacts
              this._items.next(items);

              // Return the updated contact
              return updateditem;
            }),
            switchMap((updatedItem) =>
              this.item$.pipe(
                take(1),
                filter((item) => item && item.id === id),
                tap(() => {
                  // Update the contact if it's selected
                  this._item.next(updatedItem);

                  // Return the updated contact
                  return updatedItem;
                })
              )
            )
          )
      )
    );
  }

  deleteItem(id: string): Observable<boolean> {
    return this.items$.pipe(
      take(1),
      switchMap((items) =>
        this._httpClient
          .delete(this.url + '/delete/', { params: { id } })
          .pipe(
            map((isDeleted: boolean) => {
              // Find the index of the deleted item
              const index = items.findIndex(
                (item) => item.id === id
              );

              // Delete the item
              items.splice(index, 1);

              // Update the items
              this._items.next(items);

              // Return the deleted status
              return isDeleted;
            })
          )
      )
    );
  }
}
