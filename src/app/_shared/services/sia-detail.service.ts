import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, Observable, throwError } from 'rxjs';
import { Licence } from '../modals';

type newLicence = Omit<Licence, 'id'>
@Injectable({
  providedIn: 'any',
})
export class SiaDetailService {
  path: string = 'StaffLicenses';
  id: string = 'relative_id';

  constructor(
    private readonly http: HttpClient,
    private readonly firestore: Firestore
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  get(number: string): Observable<any> {
    const baseUrl = '/api';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0',
      }),
      responseType: 'text' as const,
    };
    return this.http
      .post(baseUrl, 'LicenseNo=' + number, httpOptions)
      .pipe(catchError(this.handleError));
    // .subscribe((data) => {
    //   const new_data = data.replace(/<(?:.|\n)*?>/gm, '');
    //   console.log(new_data);
    // });
  }
  add(data: newLicence) {
    try {
      addDoc(collection(this.firestore, this.path), data);
    } catch (err) {
      console.error('Error: writeToDB ' + this.path + ' failed. Reason :', err);
    }
  }

  getLicenceByStaffId(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where(`${this.id}`, '==', String(id)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  update(data: Licence) {
    const docRef = doc(this.firestore, this.path, data.id);
    return updateDoc(docRef, { ...data });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, String(id));
    return deleteDoc(docRef);
  }
}
