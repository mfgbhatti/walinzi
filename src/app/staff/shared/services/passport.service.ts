import { Injectable } from '@angular/core';
import {
  doc,
  addDoc,
  docData,
  deleteDoc,
  updateDoc,
  Firestore,
  collection,
  DocumentData,
  collectionData,
  CollectionReference,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

import { StaffPassport } from 'src/app/staff/shared';


@Injectable({
  providedIn: 'any'
})
export class PassportService {
  private CollectionRef!: CollectionReference<DocumentData>;
  path: string = 'StaffPassport';

  constructor(private readonly firestore: Firestore) {
    this.CollectionRef = collection(this.firestore, this.path);
  }

  getAll() {
    return collectionData(this.CollectionRef, {
      idField: 'id'
    }) as Observable<StaffPassport[]>
  }

  get(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where('id', '==', String(id)));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  searchByStaffId(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where('relative_id', '==', String(id)));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  create(data: StaffPassport) {
    try {
      addDoc(this.CollectionRef, data);
    } catch (err) {
      console.error("Error: writeToDB failed. Reason :", err)
    }
  }

  update(data: StaffPassport) {
    const docRef = doc(
      this.firestore,
      `${this.path}/${data.id}`
    );
    return updateDoc(docRef, { ...data });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, id);
    return deleteDoc(docRef);
  }
}
