import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

import { ChargedRate, PayRate } from '../modals';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private readonly firestore: Firestore) { }

  add(collectionPath: string, data: ChargedRate | PayRate) {
    try {
      addDoc(collection(this.firestore, collectionPath), data);
    } catch (err) {
      console.error('Error: writeToDB ' + collectionPath + ' failed. Reason :', err)
    }
  }

  get(collectionPath: string, id: string) {
    const detailRef = collection(this.firestore, collectionPath);
    const q = query(detailRef, where('relativeId', '==', String(id)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  update(collectionPath: string, data: ChargedRate | PayRate) {
    const docRef = doc(this.firestore, collectionPath, data.id);
    return updateDoc(docRef, { ...data });

  }

  delete(collectionPath: string, id: string) {
    const docRef = doc(this.firestore, collectionPath, String(id));
    return deleteDoc(docRef);
  }
}
