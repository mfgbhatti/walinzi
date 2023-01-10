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
import { Client as DataType } from '@modules/admin/clients/clients.types';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  itemName = 'Client';
  url: string = 'api/clients';
  // url: string = 'api/apps/contacts';
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
    // return this._items.pipe(
    //   take(1),
    //   map((items) => {
    //     let newItems = cloneDeep(items)
    //     if (query) {
    //       newItems = newItems.filter((item) => item.name && item.name.toLowerCase().includes(query.toLowerCase()));
    //     }
    //     newItems.sort((a, b) => a.name.localeCompare(b.name));

    //     this._items.next(newItems);
    //     return newItems;

    //   })
    // );
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
        const item =
          items.find((item) => item && item.id === id) || null;

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
    const NewClient = {
      name: 'New Client',
      address: {
        street: 'road',
        city: 'City',
        post_code: 'and post code',
      },
      detail: {
        website: 'https://example.com',
        vat_number: 'Add VAT Number',
        phoneNumbers: [{ phone: '0000000000', label: 'Your label' }],
        emails: [{ email: 'test@example.com', label: 'Your label' }],
        notes: [{ note: 'First Note', label: 'Your label' }],
      },
    };

    return this.items$.pipe(
      take(1),
      switchMap((items) =>
        this._httpClient
          .post<DataType>(this.url + '/create/', NewClient)
          .pipe(
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

  updateItem(id: string, item: DataType): Observable<DataType> {
    return this.items$.pipe(
      take(1),
      switchMap((items) =>
        this._httpClient
          .put<DataType>(this.url + '/update/' + id + '/', item)
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
          .delete(this.url + '/delete/' + id + '/', {
            observe: 'response',
          })
          .pipe(
            map((response) => {
              if (response.status === 204) {
                const index = items.findIndex(
                  (item) => item.id === id
                );
                items.splice(index, 1);
                this._items.next(items);
                return true;
              } else {
                return false;
              }
            })
          )
      )
    );
  }
}
