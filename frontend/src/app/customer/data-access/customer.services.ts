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

import { Customer } from '@shared/interfaces/customer.types';
import { Enviroment } from 'src/enviroments';


@Injectable({ providedIn: 'root' })
export class CustomerService {
  baseUrl = Enviroment.urls.customer;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'json' as const,
  };

  // Private
  private _customer: BehaviorSubject<Customer | null> =
    new BehaviorSubject<Customer | null>(null);
  private _customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject<
    Customer[] | null
  >(null);

  private _httpClient = inject(HttpClient)

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Getter for Customer
   */
  get customer$(): Observable<Customer | null> {
    return this._customer.asObservable();
  }

  /**
   * Getter for Customers
   */
  get customers$(): Observable<Customer[] | null> {
    return this._customers.asObservable();
  }

  /**
   * Get Customers
   */
  getAll(): Observable<Customer[]> {
    return this._httpClient
      .get<Customer[]>(this.baseUrl + 'all/', this.httpOptions)
      .pipe(
        tap((response) => {
          const customers = response.sort((a, b) => a.name.localeCompare(b.name));
          this._customers.next(customers);
        })
      );
  }

  /**
   * Search Customers with given query
   *
   * @param query
   */
  // searchCustomers(query: string): Observable<Customer[]> {
  //   return this._httpClient
  //     .get<Customer[]>('api/apps/Customers/search', {
  //       params: { query },
  //     })
  //     .pipe(
  //       tap((Customers) => {
  //         this._customers.next(Customers);
  //       })
  //     );
  // }

  /**
   * Get Customer by id
   */
  getCustomerById(id: string): Observable<Customer> {
    return this._customers.pipe(
      take(1),
      map((customers) => {
        // Find the Customer
        const customer = customers?.find((item) => item.id === id) || null;

        // Update the Customer
        this._customer.next(customer);

        // Return the Customer
        return customer;
      }),
      switchMap((customer) => {
        if (!customer) {
          return throwError(
            () => 'Could not found Customer with id of ' + id + '!'
          );
        }

        return of(customer);
      })
    );
  }

  /**
   * Create Customer
   */
  create(customer: Customer): Observable<Customer[] | null> {
    return this.customers$.pipe(
      take(1),
      switchMap((customers) =>
        this._httpClient
          .post<Customer>(this.baseUrl + 'create/', customer, this.httpOptions)
          .pipe(
            map((newCustomer) => {
              // const result = [{ ...newCustomer, ...customers }];
              // this._customers.next(result);
              // return result;
              customers!.push(newCustomer);
              this._customers.next(customers);
              return customers;
            })
          )
      )
    );
  }

  update(id: string, customer: Customer): Observable<Customer[] | null> {
    return this.customers$.pipe(
      take(1),
      switchMap((customers) =>
        this._httpClient
         .put<Customer>(this.baseUrl + 'update/' + id + '/', customer, this.httpOptions)
         .pipe(
            map((updatedCustomer) => {
              // const result = customers.map((item) =>
              //   item.id === updatedCustomer.id? updatedCustomer : item
              // );
              // this._customers.next(result);
              // return result;
              const index = customers!.findIndex((item) => item.id === id);
              customers![index] = updatedCustomer;
              this._customers.next(customers);
              return customers;
            })
          )
      )
    );
  }

  delete(id: string): Observable<Customer[] | null> {
    return this.customers$.pipe(
      take(1),
      switchMap((customers) =>
        this._httpClient
         .delete<Customer>(this.baseUrl + 'delete/' + id + '/', this.httpOptions)
         .pipe(
            map((deletedCustomer) => {
              // const result = customers.filter((item) => item.id!== id);
              // this._customers.next(result);
              // return result;
              const index = customers!.findIndex((item) => item.id === id);
              customers!.splice(index, 1);
              this._customers.next(customers);
              return customers;
            })
          )
      )
    );
  }
}
