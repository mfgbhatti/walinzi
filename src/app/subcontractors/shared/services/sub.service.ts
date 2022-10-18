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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

import { Subcontractor } from 'src/app/subcontractors/shared';


@Injectable({
  providedIn: 'any'
})
export class SubcontractorService {
  private SubCollectionRef!: CollectionReference<DocumentData>;
  path: string = 'Subcontractors';

  constructor(private readonly firestore: Firestore) {
    this.SubCollectionRef = collection(this.firestore, this.path);
  }

  getAll() {
    return collectionData(this.SubCollectionRef, {
      idField: 'id'
    }) as Observable<Subcontractor[]>
  }

  get(id: string) {
    const docRef = doc(this.firestore, this.path, String(id));
    return docData(docRef, { idField: 'id' });
  }

  // search(id: string) {
  //   const detailRef = collection(this.firestore, this.path);
  //   const q = query(detailRef, where('clientId', '==', String(id)));
  //   return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  // }

  create(data: Subcontractor) {
    try {
      addDoc(this.SubCollectionRef, data);
    } catch (err) {
      console.error("Error: writeToDB failed. Reason :", err)
    }
  }

  update(data: Subcontractor) {
    const docRef = doc(
      this.firestore,
      `Subcontractors/${data.id}`
    );
    return updateDoc(docRef, { ...data });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, id);
    return deleteDoc(docRef);
  }

}
