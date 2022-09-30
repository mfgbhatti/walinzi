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
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {
  ClientNotes,
  ClientDetails,
} from 'src/app/clients/shared';
import { ContactPerson } from 'src/app/_shared';



@Injectable({
  providedIn: 'any'
})
export class ClientDetailsService {
  notesPath: string = 'ClientNotes';
  contactPersonPath: string = 'ContactPerson';
  extraDetailPath: string = 'ClientExtraDetails';

  constructor(private readonly firestore: Firestore) { }



  add(collectionPath: string, data: ClientNotes | ContactPerson | ClientDetails) {
    try {
      addDoc(collection(this.firestore, collectionPath), data);
    } catch (err) {
      console.error('Error: writeToDB ' + collectionPath + ' failed. Reason :', err)
    }
  }

  get(collectionPath: string, id: string) {
    const detailRef = collection(this.firestore, collectionPath);
    const q = query(detailRef, where('relativeId', '==', String(id)));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  getextradetail(id: string) {
    const detailRef = collection(this.firestore, this.extraDetailPath);
    const q = query(detailRef, where('clientId', '==', String(id)));
    return collectionData(q) as Observable<any[]>;
  }

  update(collectionPath: string, data: ClientNotes | ContactPerson | ClientDetails) {
    const docRef = doc(this.firestore, collectionPath, data.id);
    return updateDoc(docRef, { ...data });

  }
  
  delete(collectionPath: string, id: string) {
    const docRef = doc(this.firestore, collectionPath, String(id));
    return deleteDoc(docRef);
  }
}
