import { Injectable } from '@angular/core';
import {
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  Firestore,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {
  ClientNotes,
  ClientDetails,
  ClientContactPerson,
} from 'src/app/clients/shared';

@Injectable({
  providedIn: 'any'
})
export class ClientDetailsService {
  notesPath: string = 'ClientNotes';
  contactPersonPath: string = 'ClientContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';

  constructor(private readonly firestore: Firestore) { }

  add(collectionPath: string, data: ClientNotes | ClientContactPerson | ClientDetails) {
    try {
      addDoc(collection(this.firestore, collectionPath), data);
    } catch (err) {
      console.error('Error: writeToDB ' + collectionPath + ' failed. Reason :', err)
    }
  }

  get(collectionPath: string, id: string) {
    const detailRef = collection(this.firestore, collectionPath);
    const q = query(detailRef, where('clientId', '==', String(id)));
    return collectionData(q) as Observable<any[]>;
  }

  update(collectionPath: string, data: ClientNotes | ClientContactPerson | ClientDetails) {
    const docRef = doc(this.firestore, collectionPath, data.id);
    return updateDoc(docRef, { ...data });

  }

}
